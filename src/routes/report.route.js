const Router = require("koa-router");
const { createReport, updateById, removeById, getReportById, getReportsByUser } = require("../service/report.service.js");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/reports" });

router.get("/", auth, getReportsByUser);
router.get("/:id", auth, getReportById);
router.post("/", auth, createReport);
router.patch("/:id", auth, updateById);
router.delete("/:id", auth, removeById);

module.exports = router;