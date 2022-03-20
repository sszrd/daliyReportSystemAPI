const Report = require("../model/report.model.js");

class ReportService {
    async createReport({
        title,
        finish,
        unfinish,
        thinking,
        time,
        percent,
        userId
    }) {
        const res = await Report.create({
            title,
            finish,
            unfinish,
            thinking,
            time,
            percent,
            userId
        });
        return res.dataValues;
    }

    async updateById({
        id,
        title,
        finish,
        unfinish,
        thinking,
        time,
        percent,
        userId
    }) {
        const whereOpt = { id, userId };
        const newReport = {};
        title && Object.assign(newReport, { title });
        finish && Object.assign(newReport, { finish });
        unfinish && Object.assign(newReport, { unfinish });
        thinking && Object.assign(newReport, { thinking });
        time && Object.assign(newReport, { time });
        percent && Object.assign(newReport, { percent });
        const res = await Report.update(newReport, { where: whereOpt });
        return res[0] > 0 ? true : false;
    }

    async getReportInfo({
        id,
        title,
        finish,
        unfinish,
        thinking,
        time,
        percent,
        userId
    }) {
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        title && Object.assign(whereOpt, { title });
        finish && Object.assign(whereOpt, { finish });
        unfinish && Object.assign(whereOpt, { unfinish });
        thinking && Object.assign(whereOpt, { thinking });
        time && Object.assign(whereOpt, { time });
        percent && Object.assign(whereOpt, { percent });
        userId && Object.assign(whereOpt, { userId });
        const res = await Report.findAll({
            where: whereOpt
        })
        return res ? res.map(item => item.dataValues) : null;
    }

    async destoryById(id, userId) {
        const res = await Report.findOne({ where: { id, userId } });
        if (res) {
            return res.destroy();
        }
    }
}

module.exports = new ReportService();