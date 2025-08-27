const { isValidObjectId } = require("mongoose");

exports.objectIdValidation = (req, res, next) => {
  const isValid = isValidObjectId(req.params.id);
  if (isValid !== true) {
    return res.status(400).json({ error: "UserId is Not Valid!" });
  }
  next();
};
