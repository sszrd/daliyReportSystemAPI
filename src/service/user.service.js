const User = require("../model/user.model");

class UserService {
    //新增用户
    async createUser(username, password) {
        const res = await User.create({ username, password });
        return res.dataValues;
    }

    //查询用户
    async getUserInfo({ id, username, password, isadmin }) {
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        username && Object.assign(whereOpt, { username });
        password && Object.assign(whereOpt, { password });
        isadmin && Object.assign(whereOpt, { isadmin });
        const res = await User.findOne({
            attributes: ["id", "username", "password", "isadmin"],
            where: whereOpt
        })
        return res ? res.dataValues : null;
    }
}

module.exports = new UserService();