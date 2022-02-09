const Koa = require('koa');
const app = new Koa();
const KoaBody = require("koa-body");

const index = require('./routes/index');
const user = require('./routes/user.route');

app.use(KoaBody());
app.use(index.routes());
app.use(user.routes());

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
})
