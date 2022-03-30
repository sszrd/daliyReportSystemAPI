const Item = require("../model/item.model.js");

class ItemService {
    async createItem({
        text,
        isFinish,
        planId
    }) {
        const res = await Item.create({
            text,
            isFinish,
            planId
        });
        return res.dataValues;
    }

    async updateById({
        id,
        text,
        isFinish
    }) {
        const whereOpt = { id };
        const newItem = {};
        text && Object.assign(newItem, { text });
        if (isFinish !== undefined) {
            Object.assign(newItem, { isFinish });
        }
        const res = await Item.update(newItem, { where: whereOpt });
        return res[0] > 0 ? true : false;
    }

    async getItemInfo({
        id,
        planId,
        text,
        isFinish
    }) {
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        planId && Object.assign(whereOpt, { planId });
        text && Object.assign(whereOpt, { text });
        isFinish && Object.assign(whereOpt, { isFinish });
        const res = await Item.findAll({
            where: whereOpt
        })
        return res ? res.map(item => item.dataValues) : null;
    }

    async destoryById(id) {
        const res = await Item.findOne({ where: { id } });
        if (res) {
            return res.destroy();
        }
    }
}

module.exports = new ItemService();