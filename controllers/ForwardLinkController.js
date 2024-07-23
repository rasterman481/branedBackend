const asyncHandler = require("express-async-handler");
const Links = require("../model/linkSchema.js");
const Subdomains = require("../model/subDomainSchema.js");

const forwardLink = asyncHandler(async (req, res, next) => {
  const { route, domain } = req.body;

  if (route.length === 36) {
    // domain
  } else if (route.length === 10) {
    // Link
    const forwardLink = await Links.findOne({ _id: route });
    if (forwardLink == null)
      return res.send({ success: false, msg: "not exist" });

    forwardLink.click++;
    forwardLink.save();

    res.send({
      success: true,
      host: forwardLink.host,
      link: forwardLink.link,
    });
  } else {
    // sub domain
  }

  // if (domain) {
  //   if (route) {
  //     console.log("Domain");
  //     const prevDomain = await Subdomains.findOne({ _id: domain });
  //     if (prevDomain === null)
  //       return res.send({ success: false, msg: "not exist" });

  //     const forwardLink = prevDomain.childLink.filter((el) => el._id === route);

  //     if (forwardLink.length === 0)
  //       return res.send({ success: false, msg: "not exist" });

  //     forwardLink[0].click++;
  //     prevDomain.totalClick++;

  //     prevDomain.save();

  //     res.send({
  //       success: true,
  //       host: forwardLink[0].host,
  //       link: forwardLink[0].link,
  //     });
  //   } else {
  //     console.log("Subdomain");
  //     const forwardLink = await Subdomains.findOne({ _id: domain });
  //     if (forwardLink == null)
  //       return res.send({ success: false, msg: "not exist" });

  //     forwardLink.totalClick++;

  //     forwardLink.save();

  //     res.send({
  //       success: true,
  //       host: forwardLink.host,
  //       link: forwardLink.link,
  //     });
  //   }
  // } else {
  //   console.log("Link");
  //   const forwardLink = await Links.findOne({ _id: route });
  //   if (forwardLink == null)
  //     return res.send({ success: false, msg: "not exist" });

  //   forwardLink.click++;
  //   forwardLink.save();

  //   res.send({ success: true, host: forwardLink.host, link: forwardLink.link });
  // }
});

module.exports = { forwardLink };
