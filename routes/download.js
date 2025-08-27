const Router = require("express").Router();
const controller = require("../controllers/music");

Router.get("/:fileName", controller.downloadMusic);

module.exports = Router;
