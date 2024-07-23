const mongoose = require("mongoose");

const razorPayBill = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RazorPayBills", razorPayBill);
