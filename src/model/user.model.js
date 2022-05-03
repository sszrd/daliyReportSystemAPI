const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const User = seq.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名"
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: "密码"
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "所属团队"
    },
    isadmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "是否为管理员"
    }
})

module.exports = User;