const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connectDb");

const User = sequelize.define(
  "User",
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    alternateEmail: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    mobileNo: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    profileImg: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    website: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    pinCode: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    facebookUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    twitterUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    instagramUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    loggedWith: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "free",
    },
    forgotPasswordToken: {
      type: DataTypes.STRING,
    },
    forgotPasswordTokenExpiry: {
      type: DataTypes.DATE,
    },
    verifyToken: {
      type: DataTypes.STRING,
    },
    verifyTokenExpiry: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     username: {
//       type: String,
//       default: "",
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     alternateEmail: {
//       type: String,
//       default: "",
//     },
//     mobileNo: {
//       type: String,
//       default: "",
//     },
//     profileImg: {
//       type: String,
//       default: "",
//     },
//     website: {
//       type: String,
//       default: "",
//     },
//     address: {
//       type: String,
//       default: "",
//     },
//     city: {
//       type: String,
//       default: "",
//     },
//     country: {
//       type: String,
//       default: "",
//     },
//     pinCode: {
//       type: String,
//       default: "",
//     },
//     facebookUrl: {
//       type: String,
//       default: "",
//     },
//     twitterUrl: {
//       type: String,
//       default: "",
//     },
//     instagramUrl: {
//       type: String,
//       default: "",
//     },
//     loggedWith: {
//       type: String,
//       default: "",
//     },
//     password: {
//       type: String,
//       default: "",
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     type: {
//       type: String,
//       default: "free",
//     },
//     forgotPasswordToken: String,
//     forgotPasswordTokenExpiry: Date,
//     verifyToken: String,
//     verifyTokenExpiry: Date,
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("User", userSchema);
