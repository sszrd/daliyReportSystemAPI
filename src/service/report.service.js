const { Report } = require("../model/index.model.js");
const { addReportError, reportUpdateError, reportRemoveError, reportFindError } = require("../constant/error.type");

class ReportService {
    async createReport(ctx, next) {
        const {
            title,
            finish,
            unfinish,
            thinking,
            time,
            taskId
        } = ctx.request.body;
        const createdBy = ctx.state.user.id;
        try {
            let res = await Report.create({
                title,
                finish,
                unfinish,
                thinking,
                time,
                createdBy,
                taskId
            });
            res = res ? res.dataValues : null;
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

    async updateById(ctx, next) {
        const {
            title,
            finish,
            unfinish,
            thinking,
            time,
        } = ctx.request.body;
        const { id } = ctx.params;
        const whereOpt = { id };
        const newReport = {};
        title && Object.assign(newReport, { title });
        finish && Object.assign(newReport, { finish });
        unfinish && Object.assign(newReport, { unfinish });
        thinking && Object.assign(newReport, { thinking });
        time && Object.assign(newReport, { time });
        const res = await Report.update(newReport, { where: whereOpt });
        try {
            if (res[0] > 0) {
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

    async getReportById(ctx, next) {
        const { id } = ctx.params;
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        try {
            let res = await Report.findOne({
                where: whereOpt
            })
            res = res ? res.dataValues : null;
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res
                }
            }
        } catch (err) {
            console.error("通过id查询日报失败", err);
            ctx.status = 500;
            ctx.body = reportFindError;
        }
    }

    async getReportsByUser(ctx, next) {
        const createdBy = ctx.state.user.id;
        const whereOpt = {};
        createdBy && Object.assign(whereOpt, { createdBy });
        try {
            let res = await Report.findAll({
                where: whereOpt
            })
            res = res ? res.map(item => item.dataValues) : null;
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: res
            }
        } catch (err) {
            console.error("通过用户id查询日报失败", err);
            ctx.status = 500;
            ctx.body = reportFindError;
        }
    }

    async getReportsByTask(taskId) {
        const whereOpt = {};
        taskId && Object.assign(whereOpt, { taskId });
        const res = await Report.findAll({
            where: whereOpt
        })
        return res ? res.map(item => item.dataValues) : null;
    }

    async removeById(ctx, next) {
        const { id } = ctx.params;
        try {
            const res = await Report.findOne({ where: { id } });
            if (res) {
                res.destroy();
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

    async getReportsInfoByUser(createdBy) {
        let res = await Report.findAll({ where: { createdBy } });
        return res ? res.map(each => each.dataValues) : [];
    }

    async removeReportsByTaskId(taskId) {
        const res = await Report.findAll({ where: { taskId } });
        if (res) {
            res.forEach(report => report.destroy());
        }
    }
}

module.exports = new ReportService();