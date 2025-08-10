const Validator = require("fastest-validator");
const v = new Validator();

const createSchema = {
  name: "string|min:3|max:100",
  username: "string|unique|min:5|max:20",
  email: "email|noemalize",
  password: "string|min:8|max:20",
  confirmPassword: "equal|field:password",
  age: "number|optional|integer|positive|min:8|max:100|default:17",
  $$strict: true,
};

exports.createCheck = v.compile(createSchema);
