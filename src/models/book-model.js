const {Model} = require('objection');
const knex = require('../knex');

Model.knex(knex);

class Book extends Model {
    static get tableName(){
        return 'books';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                title: {type: 'string'},
                author: {type: 'string'}
            }
        }
    }
}

module.exports = Book;