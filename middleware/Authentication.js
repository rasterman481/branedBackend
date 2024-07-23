const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const decryptToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

async function CheckAuth(req, res, next) {
  try {
    // let token = req.cookies.token;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decodedToken = decryptToken(token);
    const { id } = decodedToken;
    const userData = await User.findById(id).select("-password");
    req.user = userData;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.send({
      success: false,
    });
  }
}

module.exports = { CheckAuth };
