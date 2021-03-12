// Update with your config settings.
const path = require("path");
module.exports = {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'migrations')
    }
};
