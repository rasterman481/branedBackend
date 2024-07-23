const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connectDb");
const User = require("./userSchema");

const Link = sequelize.define(
  "Link",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "_id",
      },
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    click: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "links",
    timestamps: true,
  }
);

User.hasMany(Link, { foreignKey: 'userId' });
Link.belongsTo(User, { foreignKey: 'userId' });

module.exports = Link;
// const mongoose = require("mongoose");

// const linkSchema = new mongoose.Schema(
//   {
//     _id: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     link: {
//       type: String,
//       required: true,
//     },
//     short: {
//       type: String,
//       required: true,
//     },
//     host: {
//       type: String,
//       required: true,
//     },
//     click: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Links", linkSchema);
