const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const Item = seq.define("item", {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "文本"
    },
    isFinish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否完成",
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "属于哪个计划"
    }
})

module.exports = Item;