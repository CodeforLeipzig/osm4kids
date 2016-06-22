/// <reference path="typings/main.d.ts" />

import fs = require('fs');
import express = require('express');
import body_parser = require('body-parser');
import { OverpassJob } from './cron';
import { pathSep } from './helpers';

let resource_dir : string = 'resources';
let query_dir : string = 'queries';
let local_port : number = 8000;
let app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.set('port', (process.env.PORT || local_port));

/* Routes Definition */
app.use(express.static('public'));
app.use('/api/playgrounds', function (req, res, next) {
    let complete_path : string = resource_dir + pathSep() + 'playgrounds.geojson';
    fs.readFile(complete_path, 'utf8', function(err, data) {
        res.json(JSON.parse(data));
    });
});

app.use('/api/doctors', function (req, res, next) {
    let complete_path : string = resource_dir + pathSep() + 'doctors.geojson';
    fs.readFile(complete_path, 'utf8', function(err, data) {
        res.json(JSON.parse(data));
    });
});

app.use('/api/schools', function (req, res, next) {
    let complete_path : string = resource_dir + pathSep() + 'schools.geojson';
    fs.readFile(complete_path, 'utf8', function(err, data) {
        res.json(JSON.parse(data));
    });
});

/* Start Server */
app.listen(app.get('port'), function() {
  console.log('Magic happens on port', app.get('port'));
});

/* Start Cronjob */
let cronjob = new OverpassJob('*/10 * * * * *', query_dir, resource_dir);
