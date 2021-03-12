const {Model} = require('objection');
const knex = require('../knex');

Model.knex(knex);

class User extends Model {
    static get tableName(){
        return 'users';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                nickname: {type: 'string'},
                password: {type: 'string'},
                books: {type: 'array'}
            }
        }
    }
}

module.exports = User;

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//     {
//         username: String,
//         password: String,
//         books: Array
//     }
// )

// const User = mongoose.model('User', userSchema);

// module.exports = User;