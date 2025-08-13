const router = require("express").Router();
const controller = require("./../controllers/musicController");
const uploader = require("./../middlewares/multer");

router.post("/music", uploader.single("music"), controller.uploadOne);

module.exports = router;
