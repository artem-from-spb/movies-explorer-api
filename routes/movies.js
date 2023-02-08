const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regExp = require('../utils/regexp');

const {
  createMovie,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovie);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required(),
      trailerLink: Joi.string()
        .required().pattern(regExp),
      id: Joi.number(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
