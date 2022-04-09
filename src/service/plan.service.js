const Plan = require("../model/plan.model.js");
const Item = require("../model/item.model.js");

class PlanService {
    async createPlan({
        target,
        progress,
        totalTime,
        userId,
        startAt,
        deadline
    }) {
        const res = await Plan.create({
            target,
            progress,
            totalTime,
            userId,
            startAt,
            deadline
        });
        return res.dataValues;
    }

    async updateById({
        id,
        userId,
        target,
        progress,
        totalTime,
        startAt,
        deadline
    }) {
        const whereOpt = { id, userId };
        const newPlan = {};
        target && Object.assign(newPlan, { target });
        if (progress !== undefined) {
            Object.assign(newPlan, { progress });
        }
        if (totalTime !== undefined) {
            Object.assign(newPlan, { totalTime });
        }
        startAt && Object.assign(newPlan, { startAt });
        deadline && Object.assign(newPlan, { deadline });
        const res = await Plan.update(newPlan, { where: whereOpt });
        return res[0] > 0 ? true : false;
    }

    async getPlanInfo({
        id,
        userId,
        target,
        progress,
        totalTime,
        startAt,
        deadline,
    }) {
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        target && Object.assign(whereOpt, { target });
        progress && Object.assign(whereOpt, { progress });
        totalTime && Object.assign(whereOpt, { totalTime });
        startAt && Object.assign(whereOpt, { startAt });
        deadline && Object.assign(whereOpt, { deadline });
        userId && Object.assign(whereOpt, { userId });
        const res = await Plan.findAll({
            where: whereOpt,
            include: [Item]
        })
        return res ? res.map(item => item.dataValues) : null;
    }

    async destoryById(id, userId) {
        const items = await Item.findAll({
            where: { planId: id }
        })
        items && items.forEach(item => item.destroy());
        const res = await Plan.findOne({
            where: { id, userId },
        });
        if (res) {
            return res.destroy();
        }
    }
}

module.exports = new PlanService();