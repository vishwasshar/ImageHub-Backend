const mongoose = require("mongoose");
require("dotenv").config();

const mongo_url = process.env.MONGO_URL;
const mongooseConnect = (callback) => {
  mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("connected");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { mongooseConnect };
