const { DataTypes, Sequelize } = require('sequelize')
const { connection } = require('../database/connection')

const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING,
    },
    materia: {
        type: DataTypes.STRING
    },
    celular: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Professor


