const db = require(`./database`)
const Sequelize = require(`sequelize`)

const Users = db.define('users', {
    name: {
        type:Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Users