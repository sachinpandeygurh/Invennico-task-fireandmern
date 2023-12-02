const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./db/dbConfig");
const bodyParser = require("body-parser");

dotenv.config();

dbConnect();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./route/AdminRoutes"));

app.use("/v1/user", require("./route/UserRoutes"));

app.listen(port, () => {
  console.log(`server is connected to the port ${port}`);
});
