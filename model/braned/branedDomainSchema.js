const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/mydb'); // Adjust connection details as needed

// Domain Model
const Domain = sequelize.define('Domain', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generates a unique UUID
    allowNull: false,
    primaryKey: true
  },
  domain: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID, // Assuming BranedUser model uses UUID as primary key
    references: {
      model: 'BranedUser', // Reference to the BranedUser model
      key: '_id'
    }
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  purchasedOn: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expiredOn: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'braned_domains',
  timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

module.exports = Domain;
// const mongoose = require("mongoose");

// const domainSchema = new mongoose.Schema(
//   {
//     domain: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "BranedUser",
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
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Domains", domainSchema);
