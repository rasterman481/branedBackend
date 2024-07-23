require("dotenv").config();
// const https = require("https");
// const path = require("path");
// const fs = require("fs");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./db/connectDb");
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
  res.send("Api is running");
});

app.use("/api/user", userRouter);
app.use("/api/domain", domainRouter);
app.use("/api/links", linkRouter);
app.use("/api/subdomain", subDomainRouter);
app.post("/api/forward", forwardLink);
app.use("/api/payment", paymentRouter);

// const options = {
//   key: fs.readFileSync(path.join(__dirname, "lib", "SSL", "key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "lib", "SSL", "cert.pem")),
// };

// const server = https.createServer(options, app);

(async () => {
  try {
    await connectDb(process.env.DB_URI);
    app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
