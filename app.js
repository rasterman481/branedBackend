require("dotenv").config();
// const https = require("https");
// const path = require("path");
// const fs = require("fs");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {connectDb} = require("./db/connectDb");
const userRouter = require("./routes/userRouter");
const domainRouter = require("./routes/domainRouter");
const linkRouter = require("./routes/linkRouter");
const subDomainRouter = require("./routes/subDomainRouter");
const paymentRouter = require("./routes/paymentRoutes");
const { forwardLink } = require("./controllers/ForwardLinkController");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  console.log("Base route hit");
  res.send("Api is running");
});

app.use("/api/user", (req, res, next) => {
  console.log("User route hit");
  next();
}, userRouter);

app.use("/api/domain", (req, res, next) => {
  console.log("Domain route hit");
  next();
}, domainRouter);

app.use("/api/links", (req, res, next) => {
  console.log("Links route hit");
  next();
}, linkRouter);

app.use("/api/subdomain", (req, res, next) => {
  console.log("Subdomain route hit");
  next();
}, subDomainRouter);

app.post("/api/forward", (req, res, next) => {
  console.log("Forward link route hit");
  next();
}, forwardLink);

app.use("/api/payment", (req, res, next) => {
  console.log("Payment route hit");
  next();
}, paymentRouter);


// const options = {
//   key: fs.readFileSync(path.join(__dirname, "lib", "SSL", "key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "lib", "SSL", "cert.pem")),
// };

// const server = https.createServer(options, app);
const User = require("./model/userSchema.js");

(async () => {
  try {
    // await connectDb(process.env.DB_URI);
    await connectDb();
    app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
