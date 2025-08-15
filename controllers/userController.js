const User = require("./../models/userModel");
const middleware = require("./../middlewares/userMiddleware");
const validator = require("./../validators/userValidator");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const isValid = validator.createCheck(req.body);
  if (isValid !== true) {
    res.status(400).json({ error: isValid });
  }
  const hashedPass = bcrypt.hashSync(req.body.password, 10);
  try {
    const { name, username, email, password, age = 17 } = req.body;
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPass,
      age: age,
    });
    const result = await newUser.save();
    res
      .status(201)
      .json({ message: "New User Created Successfully", result: result });
  } catch (err) {
    res.status(400).json({
      error: "User Already Registered With this Email or Username",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
