const express = require("express");
const router = express.Router();

const { CheckAuth } = require("../middleware/Authentication");

const {
  addDomains,
  getDomains,
  checkAvailableDomains,
  updateDomain,
} = require("../controllers/domainController");

router.post("/checkValidity", checkAvailableDomains);

router.get("/getDomains", CheckAuth, getDomains);
router.post("/checkout", CheckAuth, addDomains);
router.post("/update", CheckAuth, updateDomain);

module.exports = router;
