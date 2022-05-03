const { User } = require("../model/index.model.js");
const jwt = require("jsonwebtoken");
const { userRegisterError, userUpdateError } = require("../constant/error.type");
const { JWT_SECRET } = require("../constant/env");

class UserService {
    //新增用户
    async register(ctx, next) {
        const { username, password } = ctx.request.body;
        try {
            let res = await User.create({ username, password });
            res = res ? res.dataValues : null;
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
            const whereOpt = {};
            username && Object.assign(whereOpt, { username });
            let res = await User.findOne({
                where: whereOpt
            })
            res = res ? res.dataValues : null;
            const { password, ...load } = res;
            ctx.body = {
                code: 200,
                message: "登陆成功",
                result: {
                    token: jwt.sign(load, JWT_SECRET, { expiresIn: "1d" }),
                    isadmin: load.isadmin,
                    teamId: load.teamId
                }
            }
        } catch (err) {
            console.error("获取用户信息失败", err);
            ctx.status = 500;
            ctx.body = userRegisterError;
        }
    }

    async changeUserInfo(ctx, next) {
        const id = ctx.state.user.id;
        const { username, password, isadmin, teamId } = ctx.request.body;
        try {
            const whereOpt = { id };
            const newUser = {};
            username && Object.assign(newUser, { username });
            password && Object.assign(newUser, { password });
            isadmin && Object.assign(newUser, { isadmin });
            teamId && Object.assign(newUser, { teamId });
            const res = await User.update(newUser, { where: whereOpt });
            if (res) {
                ctx.body = {
                    code: 200,
                    message: "修改用户信息成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "修改用户信息失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("获取用户信息失败", err);
            ctx.status = 500;
            ctx.body = userUpdateError;
        }
    }

    async getUserInfoById(id) {
        const whereOpt = { id };
        let res = await User.findOne({
            where: whereOpt
        })
        res = res ? res.dataValues : null;
        if (res) {
            const { password, ...info } = res;
            return info;
        } else {
            return {};
        }
    }

    async getUserInfoByTeamId(teamId) {
        const whereOpt = { teamId };
        let res = await User.findAll({
            where: whereOpt
        })
        res = res ? res.map(each => {
            const { password, ...info } = each.dataValues;
            return info;
        }) : null;
        console.log(res);
        return res ? res : [];
    }

    async changeUserTeamId(userId, teamId) {
        const whereOpt = { id: userId };
        const newUser = { teamId };
        const res = await User.update(newUser, { where: whereOpt });
        if (res) {
            return true;
        } else {
            return false;
        }
    }

    async changeAllUserTeamId(curTeamId, newTeamId) {
        const whereOpt = { teamId: curTeamId };
        const newUser = { teamId: newTeamId };
        const res = await User.update(newUser, { where: whereOpt });
        if (res) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new UserService();