const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const Application = seq.define("application", {
    appliedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "申请人"
    },
    checkedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "审核人"
    }
})

module.exports = Application;