const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/dev', {debug: true, useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    console.log('Database connected.');
});

mongoose.connection.once('error', () => {
    console.log('Could not connect to database.');
});