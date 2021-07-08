
const express = require("express");
const app  = express();

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

/** parse requests of content-type - application/json */
app.use(bodyParser.json());

/** parse requests of content-type - application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

/** Pra verificar se a api está em execução */
const index = require("./app/routes/index");
app.use(index);

const userRoutes = require("./app/routes/user.routes");
app.use("/api/v1/users",userRoutes);

module.exports = app;