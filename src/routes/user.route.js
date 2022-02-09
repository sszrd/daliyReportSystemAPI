const Router = require("koa-router");
const { register, login } = require("../controller/user.controller");
const { userValidator, verifyUser, encrpytPassword } = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });

router.get("/", (ctx, next) => {
    ctx.body = "hello user";
})

router.post("/register", userValidator, verifyUser, encrpytPassword, register);

router.post("/login", login);

module.exports = router;