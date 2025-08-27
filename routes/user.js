const Router = require("express").Router();
const controller = require("./../controllers/user");

Router.get("/", controller.getAllUsers);
// Router.post("/register", controller.createUser);
Router.post("/login", controller.logIn);

module.exports = Router;
