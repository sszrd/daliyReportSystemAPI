const { userRegisterError } = require("../constant/error.type");
const { createUser } = require("../service/user.service");

class UserController {
    async register(ctx, next) {
        const { username, password } = ctx.request.body;
        try {
            const res = await createUser(username, password);
            ctx.body = {
                code: 0,
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
        ctx.body = "用户登陆成功";
    }
}

module.exports = new UserController();