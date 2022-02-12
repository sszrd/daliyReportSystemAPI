const Router = require("koa-router");
const router = new Router();
const fs = require("fs");

fs.readdirSync(__dirname).forEach(file => {
  if (file !== "index.js") {
    router.use(require("./" + file).routes());
  }
})

module.exports = router;
