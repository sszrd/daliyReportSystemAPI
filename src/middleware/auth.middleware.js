const { JWT_SECRET } = require("../constant/env");
const jwt = require("jsonwebtoken");
const { tokenExpiredError, jsonWebTokenError } = require("../constant/error.type");

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header;
    if (authorization) {
        const token = authorization.replace("Bearer ", "");
        try {
            const user = jwt.verify(token, JWT_SECRET);
            ctx.state.user = user;
        } catch (err) {
            switch (err.name) {
                case "TokenExpiredError":
                    ctx.status = 401;
                    ctx.body = tokenExpiredError;
                    break;
                case "JsonWebTokenError":
                    ctx.status = 401;
                    ctx.body = jsonWebTokenError;
                    break;
            }
            return;
        }
    } else {
        ctx.status = 401;
        ctx.body = jsonWebTokenError;
        return;
    }
    await next();
}

module.exports = {
    auth
}