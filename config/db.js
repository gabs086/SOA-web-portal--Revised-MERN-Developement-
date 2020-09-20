const Sequelize = require("sequelize");
const db = {};

//Connection keys for clearDb Mysql in heroku
const clearDb = require('./clearDb');
const sequelize = new Sequelize("portal", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;