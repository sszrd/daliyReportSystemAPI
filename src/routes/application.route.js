const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { getApplicationById, getApplicationByUserId, createApplication, removeById } = require("../service/application.service.js");

const router = new Router({ prefix: "/applications" });

router.get("/", auth, getApplicationByUserId);
router.get("/:id", auth, getApplicationById);
router.post("/", auth, createApplication);
router.delete("/:id", auth, removeById);

module.exports = router;