/// <reference path="typings/main.d.ts" />

// declare
import _ = require('lodash');
var fs = require('fs');
import express = require('express');        // call express

var app = express();                 // define our app using express
var bodyParser = require('body-parser');

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
