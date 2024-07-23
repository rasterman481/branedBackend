const express = require("express");
const router = express.Router();

const { CheckAuth } = require("../middleware/Authentication");

const {
  generateLink,
  getHostName,
  getLinks,
  deleteLink,
  updateLink,
} = require("../controllers/linkController");

router.get("/host", getHostName);

router.get("/getLinks", CheckAuth, getLinks);
router.post("/shorten", CheckAuth, generateLink);
router.post("/delete", CheckAuth, deleteLink);
router.post("/update", CheckAuth, updateLink);

module.exports = router;
