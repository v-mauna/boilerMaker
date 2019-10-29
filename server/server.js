const express = require('express')
const app = express();
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const db = require(`./db/database`)
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db : db })

dbStore.sync()

app.use(express.static(path.join(__dirname, '../public/')));

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
  secret: process.env.SESSION_SECRET || 'nunca sabras mis secretos',
  resave: false,
  saveUninitialized: false
}))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
  
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
  })

  module.exports = app;