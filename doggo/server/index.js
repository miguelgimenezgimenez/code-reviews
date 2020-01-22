const express = require("express");
const app = express();
const cors = require("cors");
 const morgan = require('morgan')

const db = require("./models");
const router = require("./router");
const connection = {
  hostname: "localhost",
  port: 3002
};

app.use(morgan("combi"));
app.use(cors());

app.use(express.json()); //Used to parse JSON bodies
app.use(router);

db.sequelize.sync().then(res => {
  console.log("DB connected!");
  app.listen(3002,() =>
    console.log(`Server running at ${connection.hostname}:${connection.port}`)
  );
});
