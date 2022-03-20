const Router = require("koa-router");
const { submit, update, remove, getReportById, getReportsByTitle } = require("../controller/report.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/reports" });

router.get("/", auth, getReportsByTitle);
router.get("/:id", auth, getReportById);
router.post("/", auth, submit);
router.patch("/:id", auth, update);
router.delete("/:id", auth, remove);

module.exports = router;