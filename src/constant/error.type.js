module.exports = {
    userFormatError: {
        code: "400",
        message: "用户名或密码为空",
        result: {}
    },
    userAlreadyExited: {
        code: "409",
        message: "用户名已经存在",
        result: {}
    },
    userRegisterError: {
        code: "500",
        message: "用户注册错误",
        result: {}
    },
    userDoesNotExit: {
        code: "500",
        message: "用户名不存在",
        result: {}
    },
    invalidPassword: {
        code: "403",
        message: "密码错误",
        result: {}
    },
    tokenExpiredError: {
        code: "401",
        message: "token已过期",
        result: {}
    },
    jsonWebTokenError: {
        code: "401",
        message: "无效的token",
        result: {}
    },
    userUpdateError: {
        code: "500",
        message: "用户信息更新失败",
        result: {}
    },
    addReportError: {
        code: "500",
        message: "添加日报失败",
        result: {}
    },
    reportUpdateError: {
        code: "500",
        message: "修改日报失败",
        result: {}
    },
    reportRemoveError: {
        code: "500",
        message: "删除日报失败",
        result: {}
    },
    reportFindError: {
        code: "500",
        message: "查询日报失败",
        result: {}
    }
}