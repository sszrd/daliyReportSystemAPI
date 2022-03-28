const { createPlan, updateById, getPlanInfo, destoryById } = require("../service/plan.service.js");
const { addPlanError, planFindError, planRemoveError, planUpdateError } = require("../constant/error.type");

class PlanController {
    async submit(ctx, next) {
        const {
            target,
            deadline,
        } = ctx.request.body;
        const userId = ctx.state.user.id;
        try {
            const res = await createPlan({
                target,
                deadline,
                userId
            })
            ctx.body = {
                code: 200,
                messgae: "添加成功",
                result: {
                    ...res
                }
            }
        } catch (err) {
            console.error("添加计划失败", err);
            ctx.status = 500;
            ctx.body = addPlanError;
        }
    }

    async update(ctx, next) {
        const {
            target,
            progress,
            totalTime,
            deadline
        } = ctx.request.body;
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        try {
            if (await updateById({
                id,
                target,
                progress,
                totalTime,
                deadline,
                userId
            })) {
                ctx.body = {
                    code: 200,
                    message: "修改计划成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "修改计划失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("修改计划失败", err);
            ctx.status = 500;
            ctx.body = planUpdateError;
        }
    }

    async remove(ctx, next) {
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        try {
            if (await destoryById(id, userId)) {
                ctx.body = {
                    code: 200,
                    message: "删除计划成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "删除计划失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("删除计划失败", err);
            ctx.status = 500;
            ctx.body = planRemoveError;
        }
    }

    async getPlanById(ctx, next) {
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        try {
            const res = await getPlanInfo({ id, userId });
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res[0]
                }
            }
        } catch (err) {
            console.error("通过id查询计划失败", err);
            ctx.status = 500;
            ctx.body = planFindError;
        }
    }

    async getPlansByTarget(ctx, next) {
        const userId = ctx.state.user.id;
        const { target } = ctx.query;
        try {
            const res = await getPlanInfo({ userId, target });
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res
                }
            }
        } catch (err) {
            console.error("通过标题查询计划失败", err);
            ctx.status = 500;
            ctx.body = planFindError;
        }
    }
}

module.exports = new PlanController();