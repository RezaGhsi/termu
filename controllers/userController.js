const User = require("./../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const { name, username, email, password, age = 17 } = req.body;
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password,
      age: age,
    });
    const result = await newUser.save();
    res
      .status(201)
      .json({ message: "New User Created Successfully", result: result });
  } catch (err) {
    res
      .status(400)
      .json({ error: "User Already Registered With this Email or Username" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = User.find().lean();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
