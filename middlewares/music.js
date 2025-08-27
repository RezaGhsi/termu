const { isValidObjectId } = require("mongoose");
const path = require("path");

exports.objectIdValidation = (req, res, next) => {
  const isValid = isValidObjectId(req.params.id);
  if (isValid !== true) {
    return res.status(400).json({ error: "MusicId is Not Valid!" });
  }
  next();
};

// exports.isValidFile = (validFormats = [String]) => {
//   if (typeof validFormats === "string") {
//     validFormats = [validFormats];
//   }

//   return (req, res, next) => {
//     if (req.file.fieldname !== "music") {
//       res
//         .status(400)
//         .json({ error: `Wrong Field Name!! ${req.file.fieldname}` });
//     }

//     if (!req.file) {
//       res.status(401).json({ error: "No File Provided!" });
//     }

//     const ext = path.extname(req.file.originalname);
//     if (!validFormats.includes(ext)) {
//       res.status(400).json({ error: "File Format is not Valid!" });
//     }
//     next();
//   };
// };
