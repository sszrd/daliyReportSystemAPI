const { Team } = require("../model/index.model.js");
const { changeAllUserTeamId, changeUserTeamId, getUserInfoById, getUserInfoByTeamId } = require("../service/user.service.js");
const { createTeamError, teamFindError, teamRemoveError, teamUpdateError } = require("../constant/error.type");

class TeamService {
    async createTeam(ctx, next) {
        const { name } = ctx.request.body;
        const createdBy = ctx.state.user.id;
        try {
            let res = await Team.create({
                name,
                createdBy
            });
            res = res ? res.dataValues : null;
            await changeUserTeamId(createdBy, res.id);
            ctx.body = {
                code: 200,
                messgae: "创建成功",
                result: {
                    ...res
                }
            }
        } catch (err) {
            console.error("创建团队失败", err);
            ctx.status = 500;
            ctx.body = createTeamError;
        }
    }

    async updateById(ctx, next) {
        const {
            name,
            createdBy
        } = ctx.request.body;
        const { id } = ctx.params;
        const whereOpt = { id };
        const newTeam = {};
        name && Object.assign(newTeam, { name });
        createdBy && Object.assign(newTeam, { createdBy });
        const res = await Team.update(newTeam, { where: whereOpt });
        try {
            if (res[0] > 0) {
                ctx.body = {
                    code: 200,
                    message: "修改团队信息成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "修改团队信息失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("修改团队信息失败", err);
            ctx.status = 500;
            ctx.body = teamUpdateError;
        }
    }

    async getTeamById(ctx, next) {
        const { id } = ctx.params;
        try {
            const whereOpt = {};
            id && Object.assign(whereOpt, { id });
            let res = await Team.findOne({
                where: whereOpt
            })
            res = res ? res.dataValues : null;
            const teamManager = await getUserInfoById(res.createdBy);
            const teamMembers = await getUserInfoByTeamId(id);
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res,
                    teamManager,
                    teamMembers
                }
            }
        } catch (err) {
            console.error("通过id查询条目失败", err);
            ctx.status = 500;
            ctx.body = teamFindError;
        }
    }

    async removeById(ctx, next) {
        const { id } = ctx.params;
        try {
            const res = await Team.findOne({ where: { id } });
            if (res) {
                await changeAllUserTeamId(id, 0);
                res.destroy();
                ctx.body = {
                    code: 200,
                    message: "删除团队成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "删除团队失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("删除团队失败", err);
            ctx.status = 500;
            ctx.body = teamRemoveError;
        }
    }

    async getTeamManagerId(teamId) {
        const res = await Team.findOne({ where: { id: teamId } });
        if (res) {
            return res.dataValues.createdBy;
        } else {
            return null;
        }
    }
}

module.exports = new TeamService();