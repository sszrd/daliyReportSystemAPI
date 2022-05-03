const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

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
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "所属计划"
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "所属用户"
    }
})

module.exports = Report;