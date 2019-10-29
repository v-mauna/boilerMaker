const db = require(`./database`)
const Sequelize = require(`sequelize`)

const User = db.define('user', {
    name: {
        type:Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    googleId: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING
    }
},  {
        hooks: {
            beforeCreate: setSaltAndPassword,
            beforeUpdate: setSaltAndPassword
        }
    })

    User.prototype.correctPassword = function(userPassword){
        return this.Model.encyptPassword(userPassword, this.salt) === this.password
    }

    User.prototype.sanitize = function(){
        return _.omit(this.toJSON(),['password','salt'])
    }

    User.generateSalt = function (){
        return crypto.randomBytes(16).toString('base64')
    }

    User.encyptPassword = function(plainText, salt){
        const hash = crypto.createHash('sha1');
        hash.update(plainText);
        hash.update(salt);
        return hash.digest('hex')
    }

    function setSaltAndPassword(user){
        if(user.changed('password')){
            user.salt = User.generateSalt()
            user.password = User.encyptPassword(user.password, user.salt)
        }
    }

module.exports = Users