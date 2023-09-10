const express = require("express");
const { mongooseConnect } = require("./util/database");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user");
const imgRoutes = require("./routes/Img");
const cleanup = require("./controller/cleanup");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5400;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/user", userRoutes);

app.use("/img", imgRoutes);
mongooseConnect(() => {
  app.listen(port);
});
