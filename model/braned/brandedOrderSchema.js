const mongoose = require("mongoose");

const branedOrderSchema = new mongoose.Schema(
  {
    domainId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "BranedDomains",
    },
    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "BranedUser",
    },
    price: {
      type: String,
      required: true,
    },
    purchasedOn: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BranedOrders", branedOrderSchema);
