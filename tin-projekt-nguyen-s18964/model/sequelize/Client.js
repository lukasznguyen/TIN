const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Client = sequelize.define('Client', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5, 60],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            },
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy adres email"
            }
        }
    },
    telefon: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [9, 12],
                msg: "Pole powinno zawierać od 9 do 12 znaków"
            }
        }
    },
    // password: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
});

module.exports = Client;