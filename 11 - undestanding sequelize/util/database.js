const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize('nodecomplete', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;