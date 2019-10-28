const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const path = require('path')
const port = process.env.PORT || 1337;// this can be very useful if you deploy to Heroku!

app.listen(port, function () {
  console.log("Hola");
  console.log(`Tu server esta escuchando al port: ${port}`);
});

app.use(express.static(path.join(__dirname, '../public/')));

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', require('./apiRoutes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
  
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
  })

  module.exports = app