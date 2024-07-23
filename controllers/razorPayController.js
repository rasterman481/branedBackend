const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const RazorpaySchema = require("../model/razorPayBillSchema");
const Domain = require("../model/domainSchema.js");

const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const DOMAIN = process.env.DOMAIN;

const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});

function getExpiryTimestamp(timestamp) {
  const currentDate = new Date(timestamp);
  currentDate.setMonth(currentDate.getMonth() - 3);
  const newTimestamp = currentDate.getTime();
  return newTimestamp;
}

const razorPayOrder = asyncHandler(async (req, res, next) => {
  const options = {
    amount: Number(req.body.total) * 100,
    currency: "INR",
  };

  const userId = req.user._id;
  const { cart } = req.body;
  const currentTimestamp = Date.now();
  const expiryTimestamp = getExpiryTimestamp(currentTimestamp);

  try {
    let docs = [];
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");

    const domainsInDb = await Domain.find({
      domain: { $in: cart.map((el) => el.domain) },
    });

    const domainsToAdd = cart.filter(
      (el) => !domainsInDb.some((el2) => el.domain === el2.domain)
    );

    domainsToAdd.forEach((el) => {
      docs.push({
        _id: el.domainId,
        domain: el.domain,
        userId: userId,
        expiredOn: expiryTimestamp,
        purchasedOn: currentTimestamp,
        orderId: order.id,
      });
    });

    if (domainsInDb.length) {
      await Domain.updateMany(
        { domain: { $in: domainsInDb.map((el) => el.domain) } },
        { $set: { orderId: order.id } },
        { multi: true, upsert: true, new: true }
      );
    }

    await Domain.insertMany(docs);

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

const razorPaySuccess = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_signature, razorpay_payment_id } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Store in DB
    const newPurchase = new RazorpaySchema({
      order_id: razorpay_order_id,
      signature: razorpay_signature,
      payment_id: razorpay_payment_id,
    });

    await Domain.updateMany(
      { orderId: { $in: razorpay_order_id } },
      { $set: { status: "purchased", isAvailable: false } },
      { multi: true, upsert: true, new: true }
    );
    await newPurchase.save();
    res.redirect(`${DOMAIN}/paymentsucces?reference=${razorpay_payment_id}`);
  } else {
    res.send({ success: false });
  }
});

const razorPayKey = asyncHandler(async (req, res) => {
  try {
    res.send({ success: true, key: RAZORPAY_KEY_ID });
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = {
  razorPayOrder,
  razorPaySuccess,
  razorPayKey,
};
