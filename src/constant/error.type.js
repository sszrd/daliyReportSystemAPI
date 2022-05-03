module.exports = {
    userFormatError: {
        code: 400,
        message: "用户名或密码为空",
        result: {}
    },
    userAlreadyExited: {
        code: 409,
        message: "用户名已经存在",
        result: {}
    },
    userRegisterError: {
        code: 500,
        message: "用户注册错误",
        result: {}
    },
    userDoesNotExit: {
        code: 500,
        message: "用户名不存在",
        result: {}
    },
    invalidPassword: {
        code: 403,
        message: "密码错误",
        result: {}
    },
    tokenExpiredError: {
        code: 401,
        message: "token已过期",
        result: {}
    },
    jsonWebTokenError: {
        code: 401,
        message: "无效的token",
        result: {}
    },
    userUpdateError: {
        code: 500,
        message: "用户信息更新失败",
        result: {}
    },
    addReportError: {
        code: 500,
        message: "添加日报失败",
        result: {}
    },
    reportUpdateError: {
        code: 500,
        message: "修改日报失败",
        result: {}
    },
    reportRemoveError: {
        code: 500,
        message: "删除日报失败",
        result: {}
    },
    reportFindError: {
        code: 500,
        message: "查询日报失败",
        result: {}
    },
    itemFindError: {
        code: 500,
        message: "查询条目失败",
        result: {}
    },
    itemRemoveError: {
        code: 500,
        message: "删除条目失败",
        result: {}
    },
    itemUpdateError: {
        code: 500,
        message: "更新条目失败",
        result: {}
    },
    addItemError: {
        code: 500,
        message: "添加条目失败",
        result: {}
    },
    addTaskError: {
        code: 500,
        message: "添加任务失败",
        result: {}
    },
    taskFindError: {
        code: 500,
        message: "查询任务失败",
        result: {}
    },
    taskRemoveError: {
        code: 500,
        message: "删除任务失败",
        result: {}
    },
    taskUpdateError: {
        code: 500,
        message: "更新任务失败",
        result: {}
    },
    createTeamError:{
        code: 500,
        message: "创建团队失败",
        result: {}
    },
    teamUpdateError:{
        code: 500,
        message: "更新团队失败",
        result: {}
    },
    teamFindError: {
        code: 500,
        message: "查询团队失败",
        result: {}
    },
    teamRemoveError: {
        code: 500,
        message: "删除团队失败",
        result: {}
    },
    createApplicationError:{
        code: 500,
        message: "提交申请失败",
        result: {}
    },
    applicationFindError: {
        code: 500,
        message: "查询申请失败",
        result: {}
    },
    applicationRemoveError: {
        code: 500,
        message: "删除申请失败",
        result: {}
    }
}