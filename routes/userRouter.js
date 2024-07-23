const express = require("express");
const router = express.Router();

const { CheckAuth } = require("../middleware/Authentication");
const {
  getAllUser,
  loginWithGoogle,
  getUserByToken,
  signUp,
  login,
  forgotPassword,
  createNewPassword,
  verifyMail,
} = require("../controllers/userController");

router.route("/").get((req, res, next) => {
  console.log("getAllUser route hit");
  next();
}, getAllUser);

router.route("/loginWithGoogle").post((req, res, next) => {
  console.log("loginWithGoogle route hit");
  next();
}, loginWithGoogle);

router.route("/login").post((req, res, next) => {
  console.log("login route hit");
  next();
}, login);

router.route("/signUp").post((req, res, next) => {
  console.log("signUp route hit");
  next();
}, signUp);

router.get("/getUserByToken", CheckAuth, (req, res, next) => {
  console.log("getUserByToken route hit");
  next();
}, getUserByToken);

router.route("/forgotPassword").post((req, res, next) => {
  console.log("forgotPassword route hit");
  next();
}, forgotPassword);

router.route("/createNewPassword").post((req, res, next) => {
  console.log("createNewPassword route hit");
  next();
}, createNewPassword);

router.route("/verifyMail").post((req, res, next) => {
  console.log("verifyMail route hit");
  next();
}, verifyMail);

module.exports = router;