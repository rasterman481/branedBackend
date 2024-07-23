const Domain = require("../model/domainSchema.js");
const asyncHandler = require("express-async-handler");

function getExpiryTimestamp(timestamp) {
  const currentDate = new Date(timestamp);
  currentDate.setMonth(currentDate.getMonth() - 3);
  const newTimestamp = currentDate.getTime();
  return newTimestamp;
}

const checkAvailableDomains = asyncHandler(async (req, res) => {
  try {
    const domainsList = req.body;
    const domainNames = [];
    domainsList.forEach((element) => {
      domainNames.push(element.domain);
    });
    const listOfDomains = await Domain.find({
      domain: { $in: domainNames },
      isAvailable: false,
    });
    const usedDomains = [];
    listOfDomains.map((domain) => usedDomains.push(domain.domain));
    const availableDomains = domainsList.filter(
      (link) => !usedDomains.includes(link.domain)
    );
    res.status(200).json(availableDomains);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

const getDomains = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const data = await Domain.find({ userId });
    res.send({ success: true, data });
  } catch (error) {
    res.send({ success: false });
  }
});

const addDomains = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { cart } = req.body;
  try {
    const currentTimestamp = Date.now();
    const expiryTimestamp = getExpiryTimestamp(currentTimestamp);

    let docs = [];
    cart.forEach((el, i) => {
      docs.push({
        _id: el.domainId,
        domain: el.domain,
        userId: userId,
        expiredOn: expiryTimestamp,
        purchasedOn: currentTimestamp,
      });
    });

    await Domain.insertMany(docs);
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

const updateDomain = asyncHandler(async (req, res, next) => {
  const { _id, newUrl, host } = req.body;
  const userId = req.user._id;

  try {
    const linkExists = await Domain.findOne({ _id, userId });

    if (linkExists) {
      linkExists.link = newUrl;
      linkExists.host = host ? host : "other";

      await linkExists.save();
      res.send({ success: true, added: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = {
  addDomains,
  getDomains,
  checkAvailableDomains,
  updateDomain,
};
