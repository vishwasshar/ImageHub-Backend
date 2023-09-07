const express = require("express");
const router = express.Router();
const {
  imgSubmission,
  searchImg,
  updateImgView,
} = require("../controller/Img");
const isAuth = require("../middleware/isAuth");

router.post("/submit", isAuth, imgSubmission);

router.put("/updateView/:id", isAuth, updateImgView);

router.post("/", isAuth, searchImg);

module.exports = router;
