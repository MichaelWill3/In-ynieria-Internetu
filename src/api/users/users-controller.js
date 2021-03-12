const {Router} = require('express');
const crypto = require('crypto');
const sha2 = require('sha2');
const User = require('../../models/user-model');
const Book = require('../../models/book-model');
const asyncHandler = require('../async-handler');
const UserNotFoundException = require("../../exceptions/user-not-found-exception");
const UserAlreadyExistsException = require('../../exceptions/user-already-exists-exception');
const UserIncorrectPasswordException = require('../../exceptions/user-incorrect-password-exception');
const BookAlreadyInCollectionException = require('../../exceptions/book-already-in-collection-exception');
const BookNotFoundException = require('../../exceptions/book-not-found-exception');
const { select } = require('../../knex');
const knex = require('../../knex');
const { EDESTADDRREQ } = require('constants');
const router = new Router();


router.get('/', asyncHandler((async (req, res) => {
    const user = await User.query();
    res.send(user);
})))

router.get('/:nickname', asyncHandler(async (req, res) => {
    const nickname = req.params.nickname;
    const user = (await User.query().select("books").where("nickname", nickname));
    if(!user) throw new UserNotFoundException();

    res.send(user);
}))

router.post('/register', asyncHandler(async (req, res) => {
    var user = User.query().select().where("nickname", req.body.nickname);
    if((await user).length > 0) throw new UserAlreadyExistsException();
    const hash = sha2.sha256(req.body.password, "hex").toString('hex');
    //var pswd;
    //for(var i = 0; i < hash.data.length; i++){
    //    pswd = pswd + hash.data[i]
    //}
    user = await User.query().insert({
        nickname: req.body.nickname,
        password: hash,
        books: []
    });
    res.status(201).send(user);
}));

router.post('/books', asyncHandler(async (req, res) => {
    var user = (await User.query().where("nickname", req.body.nickname));
    if(user.length == 0) throw new UserNotFoundException();
    const hash = sha2.sha256(req.body.password, "hex").toString('hex');
    if(hash != user[0].password) throw new UserIncorrectPasswordException();
    if((await Book.query().where('id', req.body.id)).length == 0) throw new BookNotFoundException();
    var books = user[0].books;
    if(books.includes(req.body.id)) throw new BookAlreadyInCollectionException();
    if(books[0] === null) books = [req.body.id];
    else books.push(req.body.id);
    
    const resp = await User.query().where({nickname: req.body.nickname}).patch({books: books});
    //const aj = knex('users').where({username: req.body.username}).update({books: books});

    console.log(resp);
    res.status(201).send(user);
}))

router.get('/books', asyncHandler(async (req, res) => {
    var user = (await User.query().where("nickname", req.body.nickname));
    if(user.length == 0) throw new UserNotFoundException();
    const hash = sha2.sha256(req.body.password, "hex").toString('hex');
    if(hash != user[0].password) throw new UserIncorrectPasswordException();

    const books = Book.query().findByIds(user[0].books);
    res.status(201).send(books);
}))

module.exports = router;

