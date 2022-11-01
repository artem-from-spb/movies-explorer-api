require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  DATA_BASE,
  PORT,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
  DATA_BASE: NODE_ENV === 'production' ? DATA_BASE : 'mongodb://127.0.0.1:27017/moviesdb',
  PORT: (NODE_ENV === 'production') ? PORT : 3000,
};
