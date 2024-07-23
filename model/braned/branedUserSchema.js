const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/mydb'); // Adjust connection details as needed

// BranedUser Model
const BranedUser = sequelize.define('BranedUser', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generates a unique UUID
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  pinCode: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'braned_users',
  timestamps: true 
});

module.exports = BranedUser;
// const mongoose = require("mongoose");

// const branedUserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     country: {
//       type: String,
//     },
//     pinCode: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("BranedUser", branedUserSchema);
