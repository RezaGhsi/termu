const Router = require("express").Router();
const controller = require("./../controllers/musicController");

Router.get("/", controller.getAllSongs);
Router.get("/:id", controller.getMusicById);

module.exports = Router;
