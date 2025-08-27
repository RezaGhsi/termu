const router = require("express").Router();
const controller = require("./../controllers/music");
const uploader = require("../middlewares/multer");

router.post("/music", uploader.single("music"), controller.uploadOne);

module.exports = router;
