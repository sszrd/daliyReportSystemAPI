module.exports = {
    userFormatError: {
        code: "10001",
        message: "用户名或密码为空",
        result: {}
    },
    userAlreadyExited: {
        code: "10002",
        message: "用户名已经存在",
        result: {}
    },
    userRegisterError: {
        code: "10003",
        message: "用户注册错误",
        result: {}
    },
    userDoesNotExit: {
        code: "10004",
        message: "用户名不存在",
        result: {}
    },
    invalidPassword: {
        code: "10005",
        message: "密码错误",
        result: {}
    },
    tokenExpiredError: {
        code: "10101",
        message: "token已过期",
        result: {}
    },
    jsonWebTokenError: {
        code: "10102",
        message: "无效的token",
        result: {}
    },
    userUpdateError: {
        code: "10102",
        message: "用户信息更新失败",
        result: {}
    }
}