const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    purchasedOn: {
      type: Date,
      required: true,
    },
    expiredOn: {
      type: Date,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    host: {
      type: String,
      default: "other",
    },
    link: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "payment_pending",
    },
    orderId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Domains", domainSchema);
