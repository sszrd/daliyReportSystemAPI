const { Task } = require("../model/index.model.js");
const { addTaskError, taskFindError, taskRemoveError, taskUpdateError } = require("../constant/error.type");
const { removeItemsByTaskId, getItemsByTaskId } = require("../service/item.service.js");
const { removeReportsByTaskId, getReportsByTask } = require("../service/report.service.js");

class TaskService {
    async createTask(ctx, next) {
        const {
            target,
            executedBy,
            startAt,
            deadline,
        } = ctx.request.body;
        const createdBy = ctx.state.user.id;
        try {
            const res = await Task.create({
                target,
                executedBy,
                startAt,
                deadline,
                createdBy
            });
            ctx.body = {
                code: 200,
                messgae: "添加成功",
                result: {
                    ...res.dataValues
                }
            }
        } catch (err) {
            console.error("添加任务失败", err);
            ctx.status = 500;
            ctx.body = addTaskError;
        }
    }

    async updateById(ctx, next) {
        const {
            executedBy,
            target,
            isFinish,
            startAt,
            deadline
        } = ctx.request.body;
        const { id } = ctx.params;
        try {
            const whereOpt = { id };
            const newTask = {};
            target && Object.assign(newTask, { target });
            startAt && Object.assign(newTask, { startAt });
            deadline && Object.assign(newTask, { deadline });
            executedBy && Object.assign(newTask, { executedBy });
            if (isFinish !== undefined) {
                Object.assign(newTask, { isFinish });
            }
            const res = await Task.update(newTask, { where: whereOpt });
            if (res) {
                ctx.body = {
                    code: 200,
                    message: "修改任务成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "修改任务失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("修改任务失败", err);
            ctx.status = 500;
            ctx.body = taskUpdateError;
        }
    }

    async getTaskById(ctx, next) {
        const { id } = ctx.params;
        try {
            let res = await Task.findOne({
                where: { id },
            })
            res = res ? res.dataValues : null;
            const items = await getItemsByTaskId(id);
            const reports = await getReportsByTask(id);
            res.items = items;
            res.reports = reports;
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res
                }
            }
        } catch (err) {
            console.error("通过id查询任务失败", err);
            ctx.status = 500;
            ctx.body = taskFindError;
        }
    }

    async getTasksByCreatedBy(ctx, next) {
        const createdBy = ctx.state.user.id;
        try {
            let res = await Task.findAll({ where: { createdBy } });
            res = res.map(each => each.dataValues);
            for (let i = 0; i < res.length; i++) {
                res[i].items = await getItemsByTaskId(res[i].id);
                res[i].reports = await getReportsByTask(res[i].id);
            }
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: res
            }
        } catch (err) {
            console.error("通过创建者id查询任务失败", err);
            ctx.status = 500;
            ctx.body = taskFindError;
        }
    }

    async getTasksByExecutedBy(ctx, next) {
        const executedBy = ctx.state.user.id;
        try {
            let res = await Task.findAll({ where: { executedBy } });
            res = res.map(each => each.dataValues);
            for (let i = 0; i < res.length; i++) {
                res[i].items = await getItemsByTaskId(res[i].id);
                res[i].reports = await getReportsByTask(res[i].id);
            }
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: res
            }
        } catch (err) {
            console.error("通过执行者id查询任务失败", err);
            ctx.status = 500;
            ctx.body = taskFindError;
        }
    }

    async removeById(ctx, next) {
        const { id } = ctx.params;
        await removeItemsByTaskId(id);
        await removeReportsByTaskId(id);
        const res = await Task.findOne({
            where: { id },
        });
        try {
            if (res) {
                res.destroy();
                ctx.body = {
                    code: 200,
                    message: "删除任务成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "删除任务失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("删除任务失败", err);
            ctx.status = 500;
            ctx.body = taskRemoveError;
        }
    }
}

module.exports = new TaskService();