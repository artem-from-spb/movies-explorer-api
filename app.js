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

const { DATA_BASE, PORT } = require('./utils/config');

const app = express();

app.use(cors());

// Mongoose 6 always behaves as if useNewUrlParser
// and useCreateIndex are true, and useFindAndModify is false.
mongoose.connect(DATA_BASE);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(rateLimiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(defaultErrorHandler);

app.listen(PORT, () => console.log(PORT));
