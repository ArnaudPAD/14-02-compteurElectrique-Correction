const express = require("express");
const logger = require("morgan");
const indexRouter = require("./routes/index");

const app = express();
// Connexion à la base de donnée
require("./connectDb/connectDb");

app.use(logger("dev"));
app.use(express.json());

app.use("/releves", express.static("releves"));

app.use(indexRouter);

module.exports = app;
