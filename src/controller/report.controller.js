const { createReport, updateById, getReportInfo, destoryById } = require("../service/report.service.js");
const { addReportError, reportUpdateError, reportRemoveError, reportFindError } = require("../constant/error.type");

class ReportController {
    async submit(ctx, next) {
        const {
            title,
            finish,
            unfinish,
            thinking,
            time,
            percent
        } = ctx.request.body;
        const userId = ctx.state.user.id;
        try {
            const res = await createReport({
                title,
                finish,
                unfinish,
                thinking,
                time,
                percent,
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
            console.error("添加日报失败", err);
            ctx.status = 500;
            ctx.body = addReportError;
        }
    }

    async update(ctx, next) {
        const {
            title,
            finish,
            unfinish,
            thinking,
            time,
            percent
        } = ctx.request.body;
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        try {
            if (await updateById({
                id,
                title,
                finish,
                unfinish,
                thinking,
                time,
                percent,
                userId
            })) {
                ctx.body = {
                    code: 200,
                    message: "修改日报成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "修改日报失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("修改日报失败", err);
            ctx.status = 500;
            ctx.body = reportUpdateError;
        }
    }

    async remove(ctx, next) {
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        try {
            if (await destoryById(id, userId)) {
                ctx.body = {
                    code: 200,
                    message: "删除日报成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "删除日报失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("删除日报失败", err);
            ctx.status = 500;
            ctx.body = reportRemoveError;
        }
    }

    async getReportById(ctx, next) {
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        try {
            const res = await getReportInfo({ id, userId });
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res[0]
                }
            }
        } catch (err) {
            console.error("通过id查询日报失败", err);
            ctx.status = 500;
            ctx.body = reportFindError;
        }
    }

    async getReportsByTitle(ctx, next) {
        const userId = ctx.state.user.id;
        const { title } = ctx.query;
        try {
            const res = await getReportInfo({ userId, title });
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res
                }
            }
        } catch (err) {
            console.error("通过标题查询日报失败", err);
            ctx.status = 500;
            ctx.body = reportFindError;
        }
    }
}

module.exports = new ReportController();