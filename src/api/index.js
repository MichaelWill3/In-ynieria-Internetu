const {Router} = require('express')
const booksRouter = require('./books/books-controller');
const usersRouter = require('./users/users-controller');
const router = new Router();

router.use('/books', booksRouter);
router.use('/users', usersRouter);


module.exports = router;