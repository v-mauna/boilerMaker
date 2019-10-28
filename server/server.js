const express = require('express')
const app = express();
const morgan = require('morgan')
const path = require('path')

app.use(express.static(path.join(__dirname, '../public/')));

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
  
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
  })

  module.exports = app;