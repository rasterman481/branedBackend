const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BranedUser",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Domains", domainSchema);
