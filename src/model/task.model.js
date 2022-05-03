const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const Task = seq.define("task", {
    target: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "目标"
    },
    executedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "执行人"
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "创建人"
    },
    startAt: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "开始日期"
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "截止日期"
    },
    isFinish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否完成"
    }
})

module.exports = Task;