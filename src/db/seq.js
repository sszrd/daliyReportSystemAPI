const { Sequelize } = require("sequelize");

const seq = new Sequelize("db_dailyreportsystem", "root", "bd46wzj66els", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = seq;
