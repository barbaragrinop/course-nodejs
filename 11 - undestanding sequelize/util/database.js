const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodecomplete', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;