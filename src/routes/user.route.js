const Router = require("koa-router");
const { register, login, changePassword } = require("../controller/user.controller");
const { auth } = require("../middleware/auth.middleware");
const { userValidator, verifyUser, encrpytPassword, verifyLogin } = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });

router.get("/", async (ctx, next) => {
    ctx.body = "hello user";
})

router.post("/register", userValidator, verifyUser, encrpytPassword, register);

router.post("/login", userValidator, verifyLogin, login);

router.patch("/", auth, encrpytPassword, changePassword);

module.exports = router;