/// <reference path="typings/index.d.ts" />

exports = module.exports = {};

import fs = require('fs');
import express = require('express');
import body_parser = require('body-parser');
import { OverpassJob } from './cron';
import { TransformJob } from './transform';
import { pathSep } from './helpers';
var seq = require('sequence');

let resource_dir: string = 'resources';
let query_dir: string = 'queries';
let local_port: number = 8000;
let app = express();

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.set('port', (process.env.PORT || local_port));

/* Routes Definition */
app.use(express.static('public'));

app.get('/', function (req, res) {
    let content = '<h1>API</h1>' +
        '<p> <a href="/api/schools">schools</a> </p>' +
        '<p> <a href="/api/doctors">doctors</a> </p>' +
        '<p> <a href="/api/playgrounds">playgrounds</a> </p>';
    res.send(content);
});

// CORS header securiy
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

/* playgrounds */
app.use('/api/playgrounds', function (req, res, next) {
    let complete_path: string = resource_dir + pathSep() + 'playgrounds_OP.geojson';
    fs.readFile(complete_path, 'utf8', function (err, data) {
        if (err || data === 'undefined') data = '{}';
        res.json(JSON.parse(data));
    });
});

app.use('/api/playgrounds_clean', function (req, res, next) {
    let complete_path: string = resource_dir + pathSep() + 'playgrounds_OP_clean.geojson';
    fs.readFile(complete_path, 'utf8', function (err, data) {
        if (err || data === 'undefined') data = '{}';
        res.json(JSON.parse(data));
    });
});

app.use('/api/playgrounds_kidsle_geojson', function (req, res, next) {
    let complete_path: string = resource_dir + pathSep() + 'playgrounds_kidsle_kb.geojson';
    fs.readFile(complete_path, 'utf8', function (err, data) {
        if (err || data === 'undefined') data = '{}';
        res.json(JSON.parse(data));
    });
});

app.use('/api/playgrounds_complete', function (req, res, next) {
    let complete_path: string = resource_dir + pathSep() + 'playgrounds_OP_clean_merge_kidsle.geojson';
    fs.readFile(complete_path, 'utf8', function (err, data) {
        if (err || data === 'undefined') data = '{}';
        res.json(JSON.parse(data));
    });
});

/* doctors */
app.use('/api/doctors', function (req, res, next) {
    let complete_path: string = resource_dir + pathSep() + 'doctors_OP.geojson';
    fs.readFile(complete_path, 'utf8', function (err, data) {
        if (err || data === 'undefined') data = '{}';
        res.json(JSON.parse(data));
    });
});

/* schools */
app.use('/api/schools', function (req, res, next) {
    let complete_path: string = resource_dir + pathSep() + 'schools_OP.geojson';
    fs.readFile(complete_path, 'utf8', function (err, data) {
        if (err || data === 'undefined') data = '{}';
        res.json(JSON.parse(data));
    });
});

/* Start Server */
app.listen(app.get('port'), function () {
    console.log('Magic happens on port', app.get('port'));
});

/* Start Cronjob running once every hour */
let cronjob = new OverpassJob('0 0 * * * *', query_dir, resource_dir);

/* Start Transformation */
let transform_overpass_resources = new TransformJob();
transform_overpass_resources.transform_overpass_to_clean();
transform_overpass_resources.merge_overpass_with_kidsle_kb();
