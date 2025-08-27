const bcrypt = require("bcrypt");
const userModel = require("./../models/user");
const { registerValidator } = require("./../validators/register");
const tokenGen = require("./../utils/tokenGenerator");

exports.register = async (req, res) => {
  const validationResult = registerValidator(req.body);
  if (validationResult !== true) {
    return res.status(400).json({ validationResult });
  }
  try {
    const { name, username, email, age = 17 } = req.body;

    const isUserExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    console.log(isUserExists);
    if (isUserExists) {
      return res.status(400).json({
        error: "User Already Registered With this Email or Username!",
      });
    }

    const hashedPass = bcrypt.hashSync(req.body.password, 10);

    const newUser = await userModel.create({
      name,
      username,
      email,
      password: hashedPass,
      age,
    });

    const tokens = tokenGen({ id: newUser._id }, "7d", "30d");

    res.status(201).json({ user: newUser, tokens });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
