const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { createTask, updateById, getTaskById, removeById, getTasksByCreatedBy, getTasksByExecutedBy } = require("../service/task.service.js");

const router = new Router({ prefix: "/tasks" });

router.get("/createdBy", auth, getTasksByCreatedBy);
router.get("/executedBy", auth, getTasksByExecutedBy)
router.get("/:id", auth, getTaskById);
router.post("/", auth, createTask);
router.patch("/:id", auth, updateById);
router.delete("/:id", auth, removeById);

module.exports = router;