const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { genPass, verifyPass } = require("../utils/password");
const { genToken } = require("../utils/json-web-token");

router.post("/", async (req, res) => {
  try {
    const { user_name, name, password } = req.body;
    let existingUser = await User.findOne({ user_name });
    if (existingUser) {
       return res.status(400).send({ status: false, message: 'User with the same email already exists' });
    }
    const user = new User({ name, user_name, password: genPass(password) });
    const AddUser = await user.save();
    res.status(200).send({
      status: true,
      message: "User created successfully",
      data: AddUser
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: false,
      message: "User created failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name: user_name });
    if (!user) {
      return res.json({
        status: false,
        msg: "invalid user",
      });
    }
    if (!verifyPass(user.password, password))
      return res.json({
        status: false,
        msg: "invalid user name and password",
      });
    const jwtToken = genToken(user);
    res.status(200).send({
      status: true,
      message: "User Login successfully",
      token: jwtToken,
      user: user
    });
  } catch (error) {
    res.json({
      status: false,
      msg: "invalid user name and password",
    });
  }
});

module.exports = router;
