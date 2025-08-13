const Router = require("express").Router();
const controller = require("./../controllers/musicController");
const uploader = require("./../middlewares/multer");

Router.get("/", controller.getAllSongs);
Router.get("/:id", controller.getMusicById);

module.exports = Router;
