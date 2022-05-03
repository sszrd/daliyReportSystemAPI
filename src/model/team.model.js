const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const Team = seq.define("team", {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "团队名称"
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "团队管理员"
    }
})

module.exports = Team;