/// <reference path="typings/main.d.ts" />

var express = require('express');
var app = express();
var fs = require('fs');
var body_parser = require('body-parser');
import _ = require('lodash');
import { OverpassJob } from './cron';
var port_num = 8000;

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

/* Routes */
app.use(express.static('public'));
app.use('/api/playgrounds', function (req, res, next) {
    res.json( JSON.parse(fs.readFileSync('./resources/playgrounds.geojson')) );
});

app.use('/api/doctors', function (req, res, next) {
    res.json( JSON.parse(fs.readFileSync('./resources/doctors.geojson')) );
});

app.use('/api/schools', function (req, res, next) {
    res.json( JSON.parse(fs.readFileSync('./resources/schools.geojson')) );
});

/* Start Server */
app.listen(port_num);
console.log('Magic happens on port ' + port_num);

/* Start Cronjob */
let cronjob = new OverpassJob('* * */6 * * *', 'queries', 'resources');
