const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html');

})


app.post('/', (req, res) => {

  const location = req.body.location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dbc3ac1cac9b674e666fb415dda459e5&units=metric`;

  https.get(url, (response) => {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/weather.html");
    }
    else if (response.statusCode === 404) {
      res.sendFile(__dirname + "/failure.html");
    }

  })

})

app.post('/failure.html', (req, res) => {

  res.redirect("/");

})

app.listen(3000, () => {

  console.log('listening on 3000');

});