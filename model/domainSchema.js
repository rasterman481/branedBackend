const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connectDb");
const User = require("./userSchema");

const Domain = sequelize.define(
  "Domain",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "_id",
      },
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    purchasedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiredOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    host: {
      type: DataTypes.STRING,
      defaultValue: "other",
    },
    link: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "payment_pending",
    },
    orderId: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "domains",
    timestamps: true,
  }
);

User.hasMany(Domain, { foreignKey: "userId" });
Domain.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Domain };

// const mongoose = require("mongoose");

// const domainSchema = new mongoose.Schema(
//   {
//     _id: {
//       type: String,
//       required: true,
//     },
//     domain: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     isAvailable: {
//       type: Boolean,
//       default: true,
//     },
//     purchasedOn: {
//       type: Date,
//       required: true,
//     },
//     expiredOn: {
//       type: Date,
//       required: true,
//     },
//     count: {
//       type: Number,
//       default: 0,
//     },
//     host: {
//       type: String,
//       default: "other",
//     },
//     link: {
//       type: String,
//       default: null,
//     },
//     status: {
//       type: String,
//       default: "payment_pending",
//     },
//     orderId: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Domains", domainSchema);
