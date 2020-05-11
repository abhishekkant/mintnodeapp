'use strict';

const express = require('express');
var os = require('os');
var fs = require('fs');
const request = require('request');
const dotenv = require('dotenv');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
dotenv.config();
var content = 'Namaste India ' + process.env.USER + ' ' + os.hostname();

app.get('/', (req, res) => {
 
  res.send(content);
});

app.get('/savefile', (req,res) => {
  fs.writeFile('mynewfile.txt', content, function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });
});

app.get('/weather', (req, res) => {
  console.log('The weather Service is at:' + process.env.WeatherService);

  // fetch('http://localhost:32000/weatherforecast')
  //   .then(res => res.json())
  //   .then(json => { 
  //     console.log(json);
  //     content = json;
  //   });

  request('http://mintnodeapp-service.default.svc.cluster.local:32000/weatherforecast',(err,resp,body) => {
    content = JSON.stringify(body);
  });

  res.send(content);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);