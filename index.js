const express        = require('express');
const app            = express();

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});

app.use(express.static('build'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var max = 55;
var min = 45;
var percentage = 0;

app.get("/value", function (req, res) {
  res.send(parseInt(percentage).toString());
});

calibrate = (v) => {
  max = (v > max) ? v : max;
  min = (v < min) ? v : min;
  percentage = (v - min) / (max - min) * 100;
}

app.get("/value/:value", function (req, res) {
  calibrate(parseInt(req.params.value));
  res.sendStatus(200);
});
