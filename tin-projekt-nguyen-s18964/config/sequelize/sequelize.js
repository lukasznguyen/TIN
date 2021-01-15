const Sequelize = require('sequelize');

const sequelize = new Sequelize('proservice', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;