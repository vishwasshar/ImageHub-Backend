const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controller/user");

router.put("/create", createUser);

router.post("/login", loginUser);

module.exports = router;
