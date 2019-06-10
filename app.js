require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(helmet());
const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "dev";
app.use(morgan(morganSetting));

module.exports = app;