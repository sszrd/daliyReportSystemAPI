const Koa = require('koa');
const app = new Koa();
const KoaBody = require("koa-body");
const cors = require("koa2-cors");

const router = require('./routes/index');

app.use(cors({
  origin: function (ctx) {
    return 'http://localhost:3000';
  },
  maxAge: 60,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Authorization'],
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
}));
app.use(KoaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000, () => {
  console.log("server is running on http://localhost:5000");
})
