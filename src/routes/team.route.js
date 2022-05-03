const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { createTeam, updateById, getTeamById, removeById } = require("../service/team.service.js");

const router = new Router({ prefix: "/teams" });

router.get("/", auth, getTeamById);
router.get("/:id", auth, getTeamById);
router.post("/", auth, createTeam);
router.patch("/:id", auth, updateById);
router.delete("/:id", auth, removeById);

module.exports = router;