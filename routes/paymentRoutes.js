const express = require("express");
const router = express.Router();
const { CheckAuth } = require("../middleware/Authentication");
const {
  razorPayOrder,
  razorPaySuccess,
  razorPayKey,
} = require("../controllers/razorPayController");

router.post("/razorPay/order", CheckAuth, razorPayOrder);
router.post("/razorPay/success", razorPaySuccess);
router.get("/razorPay/getKey", CheckAuth, razorPayKey);

module.exports = router;
