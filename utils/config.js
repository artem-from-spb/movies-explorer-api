require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  JWT_SECRET: (NODE_ENV === 'production') ? JWT_SECRET : 'some-secret-key',
  DATA_BASE: 'mongodb://localhost:27017/moviesdb',
};
