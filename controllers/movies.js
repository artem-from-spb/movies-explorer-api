const Movie = require('../models/movie');

const DataError = require('../errors/DataError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  dataErrorMessage,
  notFoundErrorMessage,
  forbiddenErrorMessage,
} = require('../utils/errorMessages');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: ownerId,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new DataError(dataErrorMessage));
      } else {
        next(err);
      }
    });
};

const getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((list) => {
      res.send(list);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError(notFoundErrorMessage))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenErrorMessage);
      }
      Movie.deleteOne(movie).then(() => {
        res.send({ movie });
      })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovie,
  deleteMovie,
};
