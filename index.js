const port = process.env.PORT || 1337;// this can be very useful if you deploy to Heroku!
const app = require('./server/server.js')

app.listen(port, function () {
  console.log("Hola");
  console.log(`Tu server esta escuchando al port: ${port}`);
});
