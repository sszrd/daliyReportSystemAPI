const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { submit, update, remove, getPlansByTarget, getPlanById } = require("../controller/plan.controller.js");

const router = new Router({ prefix: "/plans" });

router.get("/", auth, getPlansByTarget);
router.get("/:id", auth, getPlanById);
router.post("/", auth, submit);
router.patch("/:id", auth, update);
router.delete("/:id", auth, remove);

module.exports = router;