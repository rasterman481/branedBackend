const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDb = (uri) =>
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("Db connected"))
    .catch((error) => console.log(error));

module.exports = connectDb;
