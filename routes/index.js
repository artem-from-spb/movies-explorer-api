const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);

router.use('/users', routerUsers);
router.use('/movies', routerMovies);

router.use('*', () => {
  throw new NotFoundError('Ошибка 404');
});

module.exports = router;
