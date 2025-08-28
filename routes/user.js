const router = require("express").Router();
const controller = require("./../controllers/user");
const authMiddleware = require("./../middlewares/auth");
const isAdminMiddleware = require("./../middlewares/isAdmin");

router.get("/", authMiddleware, isAdminMiddleware, controller.getAllUsers);

module.exports = router;
