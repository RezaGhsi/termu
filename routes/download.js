const router = require("express").Router();
const controller = require("../controllers/music");

router.get("/:fileName", controller.downloadMusic);

module.exports = router;
