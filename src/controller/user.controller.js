const { userRegisterError, userUpdateError } = require("../constant/error.type");
const { createUser, getUserInfo, updateById } = require("../service/user.service");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constant/env");

class UserController {
    async register(ctx, next) {
        const { username, password } = ctx.request.body;
        try {
            const res = await createUser(username, password);
            ctx.body = {
                code: 200,
                messgae: "注册成功",
                result: {
                    id: res.id,
                    username: res.username
                }
            }
        } catch (err) {
            console.error("添加用户失败", err);
            ctx.status = 500;
            ctx.body = userRegisterError;
        }
    }

    async login(ctx, next) {
        const { username } = ctx.request.body;
        try {
            const { password, ...res } = await getUserInfo({ username });
            ctx.body = {
                code: 200,
                message: "登陆成功",
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" })
                }
            }
        } catch (err) {
            console.error("获取用户信息失败", err);
            ctx.status = 500;
            ctx.body = userRegisterError;
        }
    }

    async changePassword(ctx, next) {
        const id = ctx.state.user.id;
        const password = ctx.request.body.password;
        try {
            if (await updateById({ id, password })) {
                ctx.body = {
                    code: 200,
                    message: "修改密码成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "修改密码失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("获取用户信息失败", err);
            ctx.status = 500;
            ctx.body = userUpdateError;
        }
    }
}

module.exports = new UserController();