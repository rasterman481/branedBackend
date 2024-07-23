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

router.route("/").get(getAllUser);
router.route("/loginWithGoogle").post(loginWithGoogle);
router.route("/login").post(login);
router.route("/signUp").post(signUp);
router.get("/getUserByToken", CheckAuth, getUserByToken);
router.route("/forgotPassword").post(forgotPassword);
router.route("/createNewPassword").post(createNewPassword);
router.route("/verifyMail").post(verifyMail);

module.exports = router;
