const seq = require("../db/seq");
const Task = require("./task.model.js");
const User = require("./user.model.js");
const Item = require("./item.model.js");
const Report = require("./report.model.js");
const Team = require("./team.model.js");
const Application = require("./application.model.js");

//seq.sync({ force: true });

module.exports = {
    Task,
    User,
    Item,
    Report,
    Team,
    Application
}