const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

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
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/),
    }),
  }),
  createMovie,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
