const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { submit, getItemById, getItemsByPlanId, update, remove } = require("../controller/item.controller.js");

const router = new Router({ prefix: "/items" });

router.get("/", auth, getItemsByPlanId);
router.get("/:id", auth, getItemById);
router.post("/", auth, submit);
router.patch("/:id", auth, update);
router.delete("/:id", auth, remove);

module.exports = router;