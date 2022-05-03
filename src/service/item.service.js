const { Item } = require("../model/index.model.js");
const { addItemError, itemFindError, itemRemoveError, itemUpdateError } = require("../constant/error.type");

class ItemService {
    async createItem(ctx, next) {
        const {
            text,
            taskId,
        } = ctx.request.body;
        try {
            let res = await Item.create({
                text,
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
            console.error("添加条目失败", err);
            ctx.status = 500;
            ctx.body = addItemError;
        }
    }

    async updateById(ctx, next) {
        const {
            text,
            isFinish
        } = ctx.request.body;
        const { id } = ctx.params;
        const whereOpt = { id };
        const newItem = {};
        text && Object.assign(newItem, { text });
        if (isFinish !== undefined) {
            Object.assign(newItem, { isFinish });
        }
        const res = await Item.update(newItem, { where: whereOpt });
        try {
            if (res[0] > 0) {
                ctx.body = {
                    code: 200,
                    message: "修改条目成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "修改条目失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("修改条目失败", err);
            ctx.status = 500;
            ctx.body = itemUpdateError;
        }
    }

    async getItemById(ctx, next) {
        const { id } = ctx.params;
        try {
            const whereOpt = {};
            id && Object.assign(whereOpt, { id });
            let res = await Item.findOne({
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
            console.error("通过id查询条目失败", err);
            ctx.status = 500;
            ctx.body = itemFindError;
        }
    }

    async getItemsByTaskId(taskId) {
        const whereOpt = {};
        taskId && Object.assign(whereOpt, { taskId });
        const res = await Item.findAll({
            where: whereOpt
        })
        return res ? res.map(item => item.dataValues) : null;
    }

    async removeById(ctx, next) {
        const { id } = ctx.params;
        try {
            const res = await Item.findOne({ where: { id } });
            if (res) {
                res.destroy();
                ctx.body = {
                    code: 200,
                    message: "删除条目成功",
                    result: {}
                }
            } else {
                ctx.body = {
                    code: 409,
                    message: "删除条目失败",
                    result: {}
                }
            }
        } catch (err) {
            console.error("删除条目失败", err);
            ctx.status = 500;
            ctx.body = itemRemoveError;
        }
    }

    async removeItemsByTaskId(taskId) {
        const res = await Item.findAll({ where: { taskId } });
        if (res) {
            res.forEach(item => item.destroy());
        }
    }
}

module.exports = new ItemService();