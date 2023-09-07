const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(req.body.password, 12)
          .then((hashedPw) => {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hashedPw,
            });

            return newUser.save();
          })
          .then((data) => {
            loginUser(req, res);
          })
          .catch(() => {
            console.log("Error in creating user");
          });
      } else {
        res.status(400).json({ message: "User already Exist" });
      }
    })
    .catch(() => {});
};

const loginUser = (req, res) => {
  let loadedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.json({ res: "User not found" });
      } else {
        loadedUser = user;
        return bcrypt.compare(req.body.password, loadedUser.password);
      }
    })
    .then((isEqual) => {
      if (!isEqual) {
        res.json({ status: "Wrong Password" });
      } else {
        const token = jwt.sign({ userObj: loadedUser }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .json({ message: "LoggedIn", userName: loadedUser.name, token });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { createUser, loginUser };
