/// <reference path="typings/main.d.ts" />

// declare
import _ = require('lodash');
var fs = require('fs');
import express = require('express');     // call express

var app = express();                     // define our app using express
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var overpass = require('query-overpass');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use(express.static('public'));

app.use('/api/playgrounds_kidsle', function (req, res, next) {
    var transformed = JSON.parse(fs.readFileSync('./resources/playgrounds_center_short.geojson'));
    res.json(transformed);
    //delete transformed;
});

app.use('/api/playgrounds', function (req, res, next) {
    var transformed = transformer(JSON.parse(fs.readFileSync('./resources/playgrounds_center_short.geojson')));
    res.json(transformed);
    //delete transformed;
});

app.use('/api/schools', function (req, res, next) {
    var transformed = transformer(JSON.parse(fs.readFileSync('./resources/schools_center_short.geojson')));
    res.json(transformed);
    //delete transformed;
});

// functions
function transformer(data) {

    var retArr = [];

    _(data['elements']).forEach(function (element) {
        if (element["type"] == "node") {
            retArr.push({
                id: element['id'],
                latitude: element['lat'],
                longitude: element['lon']
            });
        }
        else if (element["type"] == "way" && (typeof element['center'] != "undefined")) { // type is way and not empty
            retArr.push({
                id: element['id'],
                latitude: element['center']['lat'],
                longitude: element['center']['lon']
            });
        }
        else {
            console.log("not detected -> id: " + (element['id']));
        }

    });

    return retArr;              // The function returns the product of p1 and p2
}


// start server
app.listen(8000);
console.log('Magic happens on port ' + 8000);

/* fetch new data from osm every 6hrs */
var overpass_job = schedule.scheduleJob('* * */6 * * *', function() {
    /* handle Windows path seperator */
    var sep = isWin() ? '\\' : '/';
    var base_dir = process.cwd();
    var query_dir = base_dir + sep + 'queries';
    var resource_dir = base_dir + sep + 'resources';

    fs.readdir(query_dir, function(err, files) {
        if (err) throw err;
        /* complete directory to query files */
        var query_files = _.map(files, function(fname) {
            return query_dir + sep + fname;
        });

        query_files.forEach(function(query_file) {
            /* complete directory to resource files */
            var rfile = resource_dir + sep + baseName(query_file) + '.geojson';

            fs.readFile(query_file, 'utf8', function(err, query) {
                if (err) throw err;
                overpass(query, function(err, data) {
                    fs.writeFile(rfile, JSON.stringify(data), function(err) {
                        if (err) throw err;
                        console.log('successfully wrote file ' + rfile);
                    });
                });
            });
        });
    });
});

/* Utility functions */

function isWin() {
    return (/^win/.test(process.platform));
}

function baseName(str) {
    var sep = isWin() ? '\\' : '/';
    var base = new String(str).substring(str.lastIndexOf(sep) + 1);
    if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}
