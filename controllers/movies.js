const Movie = require('../models/movie');

const DataError = require('../errors/DataError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Movie.create({ name, link, owner: ownerId })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new DataError('Неверные данные'));
      } else {
        next(err);
      }
    });
};

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((list) => {
      res.send(list);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      Movie.deleteOne(card).then(() => {
        res.send({ card });
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
