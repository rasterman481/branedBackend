const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connectDb");
const User = require("./userSchema");
const Domain = require("./domainSchema");

const Subdomain = sequelize.define(
  "Subdomain",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    subDomain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domainId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "domains",
        key: "_id",
      },
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  },
  {
    tableName: "subdomains",
    timestamps: true,
  }
);

// Domain.hasMany(Subdomain, { foreignKey: "domainId" });
// Subdomain.belongsTo(Domain, { foreignKey: "domainId" });

module.exports = Subdomain;

// const mongoose = require("mongoose");

// const subdomainSchema = new mongoose.Schema(
//   {
//     subDomain: {
//       type: String,
//       required: true,
//     },
//     domainId: {
//       type: String,
//       required: true,
//     },
//     isAvailable: {
//       type: Boolean,
//       default: false,
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
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Subdomains", subdomainSchema);
