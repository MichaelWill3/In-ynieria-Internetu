const express = require('express');
const api = require('./src/api');
const errorHandler = require('./src/middlewares/error-handler');
const mongo = require('./mongodb');

const port = process.env.PORT || 1337;
const env = process.env.NODE_ENV || 'development';
const app = express();



app.use(express.json());
app.use('/api', api)
app.use(errorHandler);
app.listen(port, '127.0.0.1', () => {
    console.log(`Server listening on http://127.0.0.1:${port} in ${env} mode`);
})