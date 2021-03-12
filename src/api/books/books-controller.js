const {Router} = require('express');
const Book = require('../../models/book-model');
const asyncHandler = require('../async-handler');
const BookNotFoundException = require("../../exceptions/book-not-found-exception");
const knex = require('../../knex');
const router = new Router();

router.get('/', asyncHandler((async (req, res) => {
    const books = await Book.query();
    res.send(books);
})))

router.get('/id/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const book = await Book.query().findById(id);
    if(!book) throw new BookNotFoundException();

    res.send(book);
}))

router.get('/title/:booktitle', asyncHandler(async (req, res) => {
    const booktitle = req.params.booktitle;
    const book = await Book.query().select().where("title", 'like', `%${booktitle}%`);//działa
    if(!book) throw new BookNotFoundException();

    res.send(book);
}))

router.get('/author/:author_name', asyncHandler(async (req, res) => {
    const author_name = req.params.author_name;
    const book = await Book.query().select().where("author", 'like', `%${author_name}%`);//działa
    if(!book) throw new BookNotFoundException();

    res.send(book);
}))

router.post('/', asyncHandler(async (req, res) => {
    const book = await Book.query().insert({
        title: req.body.title,
        author: req.body.author
    });
    res.status(201).send(book);
}))

router.put('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedBook = await Book.query().patchAndFetchById(id, {
        "title": req.body.title,
        "author": req.body.author
    })
    if(!updatedBook) throw new BookNotFoundException();
    res.send(updatedBook);
}))

router.delete('/:id', asyncHandler(async (req,res) => {
    const {id} = req.params;
    res = await Book.query().deleteById(id);
    if(res === 0) throw new BookNotFoundException();
}))
module.exports = router;