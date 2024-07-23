const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connectDb");

const RazorPayBill = sequelize.define(
  "RazorPayBill",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "razor_pay_bills",
    timestamps: true,
  }
);

module.exports = RazorPayBill;

// const mongoose = require("mongoose");

// const razorPayBill = new mongoose.Schema(
//   {
//     order_id: {
//       type: String,
//       required: true,
//     },
//     signature: {
//       type: String,
//       required: true,
//     },
//     payment_id: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("RazorPayBills", razorPayBill);
