var Sequelize = require('sequelize');
require('dotenv').config(); // No var, just require. Remember this.

var sequelize = new Sequelize (
    process.env.USER_DB,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
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