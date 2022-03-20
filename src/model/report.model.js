const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const User = require("./user.model.js");

const Report = seq.define("report", {
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "标题"
    },
    finish: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "已完成的事"
    },
    unfinish: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "未完成的事"
    },
    thinking: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "思考"
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用时"
    },
    percent: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        comment: "进度"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "作者"
    }
})

Report.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id"
})

User.hasMany(Report, {
    foreignKey: "userId",
    sourceKey: "id"
})

module.exports = Report;