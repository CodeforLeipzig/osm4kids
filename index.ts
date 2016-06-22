/// <reference path="typings/main.d.ts" />

import fs = require('fs');
import express = require('express');
import body_parser = require('body-parser');
import { OverpassJob } from './cron';
import { pathSep } from './helpers';

var resource_dir : string = 'resources';
var query_dir : string = 'queries';
var port_num : number = 8000;
var app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

/* Routes Definition */
app.use(express.static('public'));
app.use('/api/playgrounds', function (req, res, next) {
    var complete_path : string = resource_dir + pathSep() + 'playgrounds.geojson';
    fs.readFile(complete_path, 'utf8', function(err, data) {
        res.json(JSON.parse(data));
    });
});

app.use('/api/doctors', function (req, res, next) {
    var complete_path : string = resource_dir + pathSep() + 'doctors.geojson';
    fs.readFile(complete_path, 'utf8', function(err, data) {
        res.json(JSON.parse(data));
    });
});

app.use('/api/schools', function (req, res, next) {
    var complete_path : string = resource_dir + pathSep() + 'schools.geojson';
    fs.readFile(complete_path, 'utf8', function(err, data) {
        res.json(JSON.parse(data));
    });
});

/* Start Server */
app.listen(port_num);
console.log('Magic happens on port ' + port_num + ".");

/* Start Cronjob */
let cronjob = new OverpassJob('* * */6 * * *', query_dir, resource_dir);
