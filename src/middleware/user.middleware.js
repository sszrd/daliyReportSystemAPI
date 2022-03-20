const { getUserInfo } = require("../service/user.service");
const { userFormatError, userAlreadyExited, userDoesNotExit, invalidPassword } = require("../constant/error.type");
const bcrypt = require("bcryptjs");

//验证用户名密码不为空
const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.status = 400;
        ctx.body = userFormatError;
        return;
    }
    await next();
}

//验证用户名未存在
const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body;
    try {
        const res = await getUserInfo({ username });
        if (res) {
            ctx.status = 409;
            ctx.body = userAlreadyExited;
            return;
        }
    } catch (err) {
        console.error("获取用户信息错误", err);
        ctx.status = 500;
        ctx.body = userAlreadyExited;
        return;
    }
    await next();
}

//密码加密
const encrpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash;
    await next();
}

//验证用户名密码是否匹配
const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    try {
        const res = await getUserInfo({ username });
        if (!res) {
            ctx.status = 403;
            ctx.body = userDoesNotExit;
            return;
        }
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.status = 403;
            ctx.body = invalidPassword;
            return;
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = userAlreadyExited;
        return;
    }
    await next();
}

module.exports = {
    userValidator,
    verifyUser,
    encrpytPassword,
    verifyLogin
};