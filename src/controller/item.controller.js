const { createItem, updateById, getItemInfo, destoryById } = require("../service/item.service.js");
const { addItemError, itemFindError, itemRemoveError, itemUpdateError } = require("../constant/error.type");

class ItemController {
    async submit(ctx, next) {
        const {
            text,
            planId,
        } = ctx.request.body;
        try {
            const res = await createItem({
                text,
                planId,
            })
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

    async update(ctx, next) {
        const {
            text,
            isFinish
        } = ctx.request.body;
        const { id } = ctx.params;
        try {
            if (await updateById({
                id,
                text,
                isFinish
            })) {
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

    async remove(ctx, next) {
        const { id } = ctx.params;
        try {
            if (await destoryById(id)) {
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

    async getItemById(ctx, next) {
        const { id } = ctx.params;
        try {
            const res = await getItemInfo({ id });
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res[0]
                }
            }
        } catch (err) {
            console.error("通过id查询条目失败", err);
            ctx.status = 500;
            ctx.body = itemFindError;
        }
    }

    async getItemsByPlanId(ctx, next) {
        const { planId } = ctx.query;
        try {
            const res = await getItemInfo({ planId });
            ctx.body = {
                code: 200,
                messgae: "查询成功",
                result: {
                    ...res
                }
            }
        } catch (err) {
            console.error("通过planId查询条目失败", err);
            ctx.status = 500;
            ctx.body = itemFindError;
        }
    }
}

module.exports = new ItemController();