
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const app  = express();


app.use(cors());

/** parse requests of content-type - application/json */
app.use(bodyParser.json());

/** parse requests of content-type - application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

/** Pra verificar se a api está em execução */
const index = require("./src/app/routes/index");
app.use(index);

const userRoutes = require("./src/app/routes/user.routes");
app.use("/api/v1/users",userRoutes);

app.use('/files',express.static(path.resolve(__dirname,'uploads')))

module.exports = app;