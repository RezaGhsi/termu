const Router = require("express").Router();
const controller = require("../controllers/musicController");

Router.get("/:fileName", controller.downloadMusic);

module.exports = Router;
