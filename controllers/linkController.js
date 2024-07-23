const Links = require("../model/linkSchema.js");
const ShortUniqueId = require("short-unique-id");
const asyncHandler = require("express-async-handler");
const extractDomain = require("extract-domain");

const APP_DOMAIN = process.env.DOMAIN;

const getHostName = asyncHandler(async (req, res, next) => {
  const { uri } = req.query;
  const url_detail = await extractDomain(uri, { tld: true });
  if (url_detail && url_detail.split(".")[0]) {
    res.send({ success: true, hostname: url_detail.split(".")[0] });
  } else {
    res.send({ success: false });
  }
});

const generateLink = asyncHandler(async (req, res, next) => {
  const { link, host } = req.body;
  const { _id } = req.user;

  try {
    const linkExists = await Links.findOne({ link, userId: _id });

    if (linkExists) {
      res.send({ success: true, link: `${APP_DOMAIN}/${linkExists.short}` });
    } else {
      const uid = new ShortUniqueId({ length: 10 });
      let short = uid.rnd();
      const newLink = new Links({
        _id: short,
        link: link,
        short: short,
        host: host,
        userId: _id,
      });

      await newLink.save();
      res.send({ success: true, link: `${APP_DOMAIN}/${short}` });
    }
  } catch (error) {
    res.send({ success: false });
  }
});

const getLinks = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  try {
    const response = await Links.find({ userId: _id });
    if (response && response.length > 0) {
      res.send({
        success: true,
        links: response.map((el) => {
          return {
            id: el._id,
            long: el.link,
            short: `${APP_DOMAIN}/${el.short}`,
            click: el.click,
            domain: el.host,
            created: new Date(el.createdAt).toLocaleString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
          };
        }),
      });
    } else {
      res.send({ success: true, links: [] });
    }
  } catch (error) {
    res.send({ success: false });
  }
});

const deleteLink = asyncHandler(async (req, res, next) => {
  const { link } = req.body;
  const { _id } = req.user;
  const id = link.split("/").slice(-1);

  try {
    await Links.findOneAndDelete({ _id: id, userId: _id });
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

const updateLink = asyncHandler(async (req, res, next) => {
  const { _id, newUrl, host } = req.body;
  const userId = req.user._id;

  try {
    const linkExists = await Links.findOne({ _id, userId });

    if (linkExists) {
      linkExists.link = newUrl;
      linkExists.host = host ? host : "other";

      await linkExists.save();
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = {
  generateLink,
  getHostName,
  getLinks,
  deleteLink,
  updateLink,
};
