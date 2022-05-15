const Router = require("koa-router");
const { register, login, changeUserInfo, changeUserInfoById, getUserInfo } = require("../service/user.service.js");
const { auth } = require("../middleware/auth.middleware");
const { userValidator, verifyUser, encrpytPassword, verifyLogin } = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });

router.get("/", auth, getUserInfo);

router.post("/register", userValidator, verifyUser, encrpytPassword, register);

router.post("/login", userValidator, verifyLogin, login);

router.patch("/", auth, encrpytPassword, changeUserInfo);

router.patch("/:id", auth, changeUserInfoById);

module.exports = router;