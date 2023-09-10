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

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin, X-File-Name, Authorization"
  );
  next();
});

app.use("/user", userRoutes);

app.use("/img", imgRoutes);
mongooseConnect(() => {
  app.listen(port);
});
