const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { createItem, getItemById, updateById, removeById } = require("../service/item.service.js");

const router = new Router({ prefix: "/items" });

router.get("/", auth, getItemById);
router.get("/:id", auth, getItemById);
router.post("/", auth, createItem);
router.patch("/:id", auth, updateById);
router.delete("/:id", auth, removeById);

module.exports = router;