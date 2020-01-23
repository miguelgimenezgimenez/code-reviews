// ON THIS DAY API
require('dotenv').config()

const Koa = require('koa');
const app = new Koa();

const port = process.env.PORT;

const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const router = require('./router');

app.use(cors());
app.use(bodyParser());
app.use(router.routes()); // says that it has to be middleware

app.listen(port, () => {
  console.log(`The server is listening on port: ${port}! 🚀`);
})


