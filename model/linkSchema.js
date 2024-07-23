const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    click: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Links", linkSchema);
