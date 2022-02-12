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

    //通过id更新用户信息
    async updateById({ id, username, password, isadmin }) {
        const whereOpt = { id };
        const newUser = {};
        username && Object.assign(newUser, { username });
        password && Object.assign(newUser, { password });
        isadmin && Object.assign(newUser, { isadmin });
        const res = await User.update(newUser, { where: whereOpt });
        return res[0] > 0 ? true : false;
    }
}

module.exports = new UserService();