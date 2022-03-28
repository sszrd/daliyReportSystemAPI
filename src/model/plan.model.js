const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const User = require("./user.model.js");

const Plan = seq.define("plan", {
    target: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "标题"
    },
    progress: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
        allowNull: false,
        comment: "进度"
    },
    totalTime: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: "总用时"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "作者"
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "计划完成日期"
    }
})

Plan.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id"
})

User.hasMany(Plan, {
    foreignKey: "userId",
    sourceKey: "id"
})

module.exports = Plan;