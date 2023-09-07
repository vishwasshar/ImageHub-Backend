const express = require("express");
const { mongooseConnect } = require("./util/database");

const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user");
const imgRoutes = require("./routes/Img");
const cleanup = require("./controller/cleanup");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5400;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

app.use("/working", (req, res, next) => {
  res.send("working");
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
