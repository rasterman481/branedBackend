const express = require("express");
const router = express.Router();

const { CheckAuth } = require("../middleware/Authentication");

const {
  checkAvailability,
  checkOut,
  getSubDomains,
  updateSubDomains,
  deleteSubDomains,
} = require("../controllers/subDomainController");

router.post("/availability", CheckAuth, checkAvailability);
router.post("/checkout", CheckAuth, checkOut);
router.post("/getSubDomains", CheckAuth, getSubDomains);
router.post("/update", CheckAuth, updateSubDomains);
router.post("/delete", CheckAuth, deleteSubDomains);

module.exports = router;
