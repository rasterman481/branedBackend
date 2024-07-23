const asyncHandler = require("express-async-handler");
const Subdomain = require("../model/subDomainSchema.js");

function getExpiryTimestamp(timestamp) {
  const currentDate = new Date(timestamp);
  currentDate.setMonth(currentDate.getMonth() - 3);
  const newTimestamp = currentDate.getTime();
  return newTimestamp;
}

const checkOut = asyncHandler(async (req, res) => {
  const { subDomain, domainId, link, host } = req.body;

  const currentTimestamp = Date.now();
  const expiryTimestamp = getExpiryTimestamp(currentTimestamp);

  try {
    const existingSubDomain = await Subdomain.find({ subDomain });

    if (existingSubDomain.length) {
      return res.send({ success: true, added: false });
    }

    const data = new Subdomain({
      subDomain,
      domainId,
      link,
      purchasedOn: currentTimestamp,
      expiredOn: expiryTimestamp,
      host,
    });
    await data.save();

    res.send({ success: true, added: true });
  } catch (error) {
    res.send({ success: false });
  }
});

const checkAvailability = asyncHandler(async (req, res) => {
  const { subdomain } = req.body;

  try {
    const subDomainExists = await Subdomain.findOne({ subdomain });
    if (subDomainExists) {
      res.send({ success: true, available: false });
    } else {
      res.send({ success: true, available: true });
    }
  } catch (error) {
    res.send({ success: false });
  }
});

const updateSubDomains = asyncHandler(async (req, res, next) => {
  const { _id, newUrl, host } = req.body;

  try {
    const subDomainExists = await Subdomain.findOne({ _id });

    if (subDomainExists) {
      subDomainExists.link = newUrl;
      subDomainExists.host = host ? host : "other";

      await subDomainExists.save();
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.send({ success: false });
  }
});

const getSubDomains = asyncHandler(async (req, res) => {
  const { domainId } = req.body;

  try {
    const data = await Subdomain.find({ domainId });
    res.send({ success: true, data });
  } catch (error) {
    res.send({ success: false });
  }
});

const deleteSubDomains = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  try {
    await Subdomain.findOneAndDelete({ _id: id });
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = {
  checkOut,
  checkAvailability,
  getSubDomains,
  updateSubDomains,
  deleteSubDomains,
};
