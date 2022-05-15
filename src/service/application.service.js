const { Application } = require("../model/index.model.js");
const { createApplicationError, applicationFindError, applicationRemoveError } = require("../constant/error.type");
const { getTeamManagerId, getTeamInfo } = require("../service/team.service.js");
const { getUserInfoById } = require("../service/user.service.js");

class ApplicationService {
    async createApplication(ctx, next) {
        const { teamId } = ctx.request.body;
        const appliedBy = ctx.state.user.id;
        try {
            const checkedBy = await getTeamManagerId(teamId);
            let res = await Application.create({
                appliedBy,
                checkedBy
            });
            res = res ? res.dataValues : null;
            ctx.body = {
                code: 200,
                messgae: "提交申请成功",
                result: {
                    ...res
                }
            }
        } catch (err) {
            console.error("提交申请失败", err);
            ctx.status = 500;
            ctx.body = createApplicationError;
        }
    }

    async getApplicationById(ctx, next) {
        const { id } = ctx.params;
        try {
            let res = await Application.findOne({
                where: { id }
            })
            res = res ? res.dataValues : null;
            const team = res ? await getTeamInfo(res.checkedBy) : {};
            const appliedUser = res ? await getUserInfoById(res.appliedBy) : {};
            const checkedUser = res ? await getUserInfoById(res.checkedBy) : {};
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: [{ ...res, team, appliedUser, checkedUser }],
            }
        } catch (err) {
            console.error("通过id查询申请失败", err);
            ctx.status = 500;
            ctx.body = applicationFindError;
        }
    }

    async getApplicationByUserId(ctx, next) {
        const userId = ctx.state.user.id;
        try {
            let res = await Application.findOne({
                where: { appliedBy: userId }
            })
            res = res ? res.dataValues : null;
            if (res) {
                const team = await getTeamInfo(res.checkedBy);
                const appliedUser = res ? await getUserInfoById(res.appliedBy) : {};
                const checkedUser = res ? await getUserInfoById(res.checkedBy) : {};
                ctx.body = {
                    code: 200,
                    messgae: "查询成功",
                    result: [{ ...res, team, appliedUser, checkedUser }]
                }
            } else {
                let res = await Application.findAll({
                    where: { checkedBy: userId }
                })
                const applications = [];
                for (let i = 0; i < res.length; i++) {
                    const appliedUser = await getUserInfoById(res[i].dataValues.appliedBy);
                    const checkedUser = await await getUserInfoById(res[i].dataValues.checkedBy);
                    const team = await getTeamInfo(res[i].dataValues.checkedBy);
                    applications.push({ ...res[i].dataValues, team, appliedUser, checkedUser });
                }
                ctx.body = {
                    code: 200,
                    messgae: "查询成功",
                    result: applications
                }
            }
        } catch (err) {
            console.error("通过id查询申请失败", err);
            ctx.status = 500;
            ctx.body = applicationFindError;
        }
    }

    async removeById(ctx, next) {
        const { id } = ctx.params;
        try {
            const res = await Application.findOne({ where: { id } });
            if (res) {
                res.destroy();
                ctx.body = {
                    code: 200,
                    message: "撤销申请成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "撤销申请失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("删除申请失败", err);
            ctx.status = 500;
            ctx.body = applicationRemoveError;
        }
    }
}

module.exports = new ApplicationService();