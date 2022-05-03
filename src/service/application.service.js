const { Application } = require("../model/index.model.js");
const { createApplicationError,applicationFindError,applicationRemoveError } = require("../constant/error.type");
const { getTeamManagerId } = require("../service/team.service.js");

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
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res,
                }
            }
        } catch (err) {
            console.error("通过id查询条目失败", err);
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
                ctx.body = {
                    code: 200,
                    messgae: "查询成功",
                    result: {
                        ...res,
                    }
                }
            } else {
                let res = await Application.findAll({
                    where: { checkedBy: userId }
                })
                res = res ? res.map(each => each.dataValues) : [];
                ctx.body = {
                    code: 200,
                    messgae: "查询成功",
                    result: res
                }
            }

        } catch (err) {
            console.error("通过id查询条目失败", err);
            ctx.status = 500;
            ctx.body = applicationFindError;
        }
    }

    async removeById(ctx, next) {
        const { id } = ctx.params;
        try {
            const res = await Application.findOne({ where: { id } });
            if (res) {
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