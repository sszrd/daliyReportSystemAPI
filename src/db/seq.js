const { Sequelize } = require("sequelize");
const { DATABASE } = require("../constant/env");

const seq = new Sequelize(DATABASE.name, DATABASE.username, DATABASE.password, {
    host: "localhost",
    dialect: "mysql"
});

module.exports = seq;
