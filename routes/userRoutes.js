const Router = require("express").Router();
const controller = require("./../controllers/userController");

Router.get("/", controller.getAllUsers);
Router.post("/register", controller.createUser);

module.exports = Router;
