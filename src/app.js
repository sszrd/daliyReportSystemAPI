const Koa = require('koa');
const app = new Koa();
const KoaBody = require("koa-body");

const router = require('./routes/index');

app.use(KoaBody());
app.use(router.routes());

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
})
