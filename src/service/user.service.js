const { User } = require("../model/index.model.js");
const jwt = require("jsonwebtoken");
const { userRegisterError, userUpdateError, getUserError } = require("../constant/error.type");
const { getReportsInfoByUser } = require("./report.service.js");
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
                    teamId: load.teamId,
                    username
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
            if (isadmin !== undefined) {
                Object.assign(newUser, { isadmin });
            }
            if (teamId !== undefined) {
                Object.assign(newUser, { teamId });
            }
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

    async changeUserInfoById(ctx, next) {
        const id = ctx.params;
        const { teamId } = ctx.request.body;
        try {
            const res = await User.update({ teamId }, { where: id });
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

    async getUserInfo(ctx, next) {
        const id = ctx.state.user.id;
        try {
            let res = await User.findOne({ where: { id } });
            res = res ? res.dataValues : null;
            if (res) {
                ctx.body = {
                    code: 200,
                    message: "获取用户信息成功",
                    result: { ...res }
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "获取用户信息失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("获取用户信息失败", err);
            ctx.status = 500;
            ctx.body = getUserError;
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
        const users = [];
        for (let i = 0; i < res.length; i++) {
            const reports = await getReportsInfoByUser(res[i].dataValues.id);
            const { password, ...info } = res[i].dataValues;
            users.push({ ...info, reports });
        }
        return users;
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