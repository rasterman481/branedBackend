const mongoose = require("mongoose");

const subdomainSchema = new mongoose.Schema(
  {
    subDomain: {
      type: String,
      required: true,
    },
    domainId: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subdomains", subdomainSchema);
