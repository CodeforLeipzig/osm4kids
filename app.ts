/// <reference path="typings/main.d.ts" />

var _ = require('lodash');

var fs = require('fs');
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================

app.use('/api/playgrounds', function (req, res, next) {
    var transformed = transformer(JSON.parse(fs.readFileSync('./data/playgrounds_center_short.geojson')));
    res.json(transformed);
    delete transformed;
});

app.use('/api/schools', function (req, res, next) {
    var transformed = transformer(JSON.parse(fs.readFileSync('./data/schools_center_short.geojson')));
    res.json(transformed);
    delete transformed;
});

function transformer(data) {

    var retArr = []

    _(data['elements']).forEach(function (element) {
        if (element["type"] == "node") {
            retArr.push({
                id: element['id'],
                latitude: element['lat'],
                longitude: element['lon']
            });
        }
        else if (element["type"] == "way" && (typeof element['center'] != "undefined")) { // Ist vom Typ way und besitzt ein ein Center-Element
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

// START THE SERVER
// =============================================================================
app.listen(8888);
console.log('Magic happens on port ' + 8888);