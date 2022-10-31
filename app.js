require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');

const routes = require('./routes/index');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

// Mongoose 6 always behaves as if useNewUrlParser
// and useCreateIndex are true, and useFindAndModify is false.
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(rateLimiter);

app.use(defaultErrorHandler);

app.listen(PORT, () => console.log(PORT));
