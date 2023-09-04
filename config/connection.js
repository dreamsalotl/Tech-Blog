var Sequelize = require('sequelize');
require('dotenv').config(); // No var, just require. Remember this.

var sequelize = new Sequelize (
    USER_DB,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: 'mysql',
        port: 3306
    }
)
sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;