const User = require("../model/userSchema.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../helpers/sendMail.js");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "99999m" });

const decryptToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

const getAllUser = async (req, res) => {
  const data = await User.find();
  res.status(200).json(data);
};

const getUserByToken = asyncHandler(async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json({ success: true, userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const loginWithGoogle = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const { name, email, profileImg } = reqBody;
    let id;
    const userExists = await User.findOne({ email });
    if (userExists) {
      id = userExists._id;
      if (!userExists.profileImg.length) {
        userExists.profileImg = profileImg;
        userExists.save();
      }
    } else {
      const data = new User({
        name,
        email,
        profileImg,
        loggedWith: "Google",
      });
      const user = await data.save();
      id = user._id;
    }
    const token = generateToken(id);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const { password, email } = reqBody;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "User not Exists" });
    }
    if (!userExists.isVerified) {
      return res.status(400).json({ message: "User not Exists" });
    }
    const validatePassword = await bcrypt.compare(
      password,
      userExists.password
    );

    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Credentials!.." });
    }
    const id = userExists._id;
    const token = generateToken(id);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

const signUp = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const { password, email, mobileNo, name } = reqBody;

    //  Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.loggedWith === "Email") {
        if (userExists.isVerified) {
          return NextResponse.json(
            { error: "User already exits" },
            { status: 400 }
          );
        } else {
          await User.findByIdAndDelete(userExists._id);
        }
      }
      if (
        userExists.loggedWith === "Google" ||
        userExists.loggedWith === "WhatsApp"
      ) {
        userExists.name = name;
        userExists.mobileNo = mobileNo;
        userExists.password = hashedPassword;
        userExists.loggedWith = "Email";
      }

      const savedUser = await userExists.save();
      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
      res.status(201).json({ message: "New User Created", success: true });
    } else {
      const newUser = new User({
        name,
        email,
        mobileNo,
        password: hashedPassword,
        loggedWith: "Email",
      });

      const savedUser = await newUser.save();
      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
      res.status(201).json({ message: "New User Created", success: true });
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const { email } = reqBody;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid Credentials!.." });
    }
    await sendEmail({ email, emailType: "RESET", userId: userExists._id });
    res
      .status(200)
      .json({ message: "Please check mail for verification", success: true });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

const createNewPassword = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const { token, password } = reqBody;
    const userExists = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    userExists.password = hashedPassword;
    userExists.forgotPasswordToken = undefined;
    userExists.forgotPasswordTokenExpiry = undefined;

    await userExists.save();
    res.status(200).json({ message: "New password created", success: true });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

const verifyMail = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const { token } = reqBody;

    const userExists = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid token" });
    }

    userExists.isVerified = true;
    userExists.verifyToken = undefined;
    userExists.verifyTokenExpiry = undefined;

    await userExists.save();

    res.status(200).json({ message: "Email verified", success: true });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

module.exports = {
  getAllUser,
  loginWithGoogle,
  getUserByToken,
  login,
  signUp,
  forgotPassword,
  createNewPassword,
  verifyMail,
};
