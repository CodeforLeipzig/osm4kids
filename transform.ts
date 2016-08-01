import fs = require('fs');
import { baseName, pathSep } from "./helpers";
import * as cons from "./constants";

var _ = require('lodash');
var geojson = require('geojson');

export class TransformJob {

    constructor() {

    }

    transform_overpass_to_clean() {
        function start() {
            console.log("start");
            // your code here
            if (countFilesWithEnding(cons.ENDING_OP) == 4) {
                console.log(cons.ENDING_OP + " :) ");
                transform_to_clean(cons.BASE_DIR + pathSep() + cons.RESOURCES);
                //setTimeout(start, 3000);
            }
            else {
                console.log(cons.ENDING_OP + " :( -> warte 5 Sekunden ");
                setTimeout(start, 5000);
            }

        }
        start();
    }

    merge_overpass_with_kidsle_kb() {
        function start2() {
            console.log("start");
            // your code here
            if (countFilesWithEnding(cons.ENDING_OP_CLEAN) == 4) {
                console.log(cons.ENDING_OP_CLEAN + " :) ");
                merge_overpass_with_kidsle_kb(cons.BASE_DIR + pathSep() + cons.RESOURCES);
                //setTimeout(start, 3000);
            }
            else {
                console.log(cons.ENDING_OP_CLEAN + " :( -> warte 5 Sekunden ");
                setTimeout(start2, 5000);
            }

        }
        start2();
    }
}

function transform_to_clean(complete_transform_dir: string) {
    fs.readdir(complete_transform_dir, function (err, query_files) {
        if (err) throw err;
        for (var i in query_files) {

            /* do not retransform transformed files */
            if (_.endsWith(query_files[i], '_OP.geojson')) {

                let file_to_transform: string = complete_transform_dir + pathSep() + query_files[i];

                let retArr: any[] = [];

                fs.readFile(file_to_transform, 'utf8', function (err, file_content) {
                    if (err) throw err;

                    if (file_content == ("" || "undefined")) {
                        console.log("file " + query_files[i] + " is empty!");
                    }
                    else {
                        var geojson_Obj = _(JSON.parse(file_content)['features']);

                        geojson_Obj.forEach(function (element) {
                            // Description: if element = 'node' || (center && (relation || way))
                            if (element["type"] == "Feature" &&
                                (element["properties"]["type"] == 'node') ||
                                (element["properties"]["geometry"] == 'center' &&
                                    (element["properties"]["type"] == 'relation' ||
                                        element["properties"]["type"] == 'way'))) {

                                retArr.push({
                                    id: element['id'],
                                    longitude: element['geometry']['coordinates'][0],
                                    latitude: element['geometry']['coordinates'][1],
                                    tags: element['properties']['tags']
                                });


                            }

                        });

                        let target_fileName: string = file_to_transform.replace('.geojson', '_clean.geojson');

                        fs.unlink(target_fileName, (err) => {
                            if (err) {
                                // throw err;
                                console.log('not successfully deleted ' + target_fileName);
                            }
                            console.log('successfully deleted ' + target_fileName);
                        });

                        // convert datastructure to valid geojson
                        let retArr_geoJson: any = geojson.parse(retArr, { Point: ['latitude', 'longitude'] });

                        // write file with indention
                        fs.writeFile(target_fileName, JSON.stringify(retArr_geoJson, null, 2), (err) => {
                            if (err) {
                                // throw err;
                                console.log('not successfully created ' + target_fileName);
                            }
                            console.log('successfully created ' + target_fileName);

                        });
                    }
                });

            }
        }
    });
}

function merge_overpass_with_kidsle_kb(complete_transform_dir: string) {

    fs.readdir(complete_transform_dir, function (err, query_files) {
        if (err) throw err;
        for (var i in query_files) {

            if (_.endsWith(query_files[i], cons.ENDING_KIDSLE_KB)) {

                /* product means information-type like playgrounds, schools, doctors or daycare */
                var product: string = _.replace(query_files[i], cons.ENDING_KIDSLE_KB, '');

                var full_path_kidsle_kb_file: string = complete_transform_dir + pathSep() + query_files[i];
                var full_path_overpass_file: string = complete_transform_dir + pathSep() + _.replace(query_files[i], cons.ENDING_KIDSLE_KB, cons.ENDING_OP_CLEAN);

                var content_kidsle_kb_file: string = fs.readFileSync(full_path_kidsle_kb_file).toString();
                var content_overpass_file: string = fs.readFileSync(full_path_overpass_file).toString();

                var json_content_kidsle_kb_file: string = JSON.parse(content_kidsle_kb_file)['features'];
                var json_content_overpass_file: string = JSON.parse(content_overpass_file)['features'];

                let return_Array: any[] = [];

                _(json_content_overpass_file).forEach(function (value_overpass) {
                    var op_lon: string = value_overpass['geometry']['coordinates'][0];
                    var op_lat: string = value_overpass['geometry']['coordinates'][1];
                    var kidsle_properties = new Array();

                    _(json_content_kidsle_kb_file).forEach(function (value_kidsle) {
                        var kidsle_lon: string = value_kidsle['geometry']['coordinates'][0];
                        var kidsle_lat: string = value_kidsle['geometry']['coordinates'][1];

                        // if op-latlon == kidsle-latnon
                        if (op_lat == kidsle_lat && op_lon == kidsle_lon) {
                            kidsle_properties = value_kidsle['properties'];
                        }
                    });

                    /* assign overpass-tags with kidsle-tags  */
                    return_Array.push({
                        id: value_overpass['id'],
                        longitude: value_overpass['geometry']['coordinates'][0],
                        latitude: value_overpass['geometry']['coordinates'][1],
                        tags: _.assign(value_overpass['properties']['tags'], kidsle_properties)
                    });
                });

                let return_array_geojson: any = geojson.parse(return_Array, { Point: ['latitude', 'longitude'] });
                let target_fileName: string = complete_transform_dir + pathSep() + product + cons.ENDING_OP_CLEAN_MERGE_KIDSLE;

                fs.unlink(target_fileName, (err) => {
                    if (err) {
                        // throw err;
                        console.log('not successfully deleted ' + target_fileName);
                    }
                    console.log('successfully deleted ' + target_fileName);
                });


                fs.writeFile(target_fileName, JSON.stringify(return_array_geojson, null, 2), (err) => {
                    if (err) {
                        // throw err;
                        console.log('not successfully created ' + target_fileName);
                    }
                    console.log('successfully created ' + target_fileName);

                });
            }
        }
    });
}

function countFilesWithEnding(ending: string) {
    var files = fs.readdirSync(cons.BASE_DIR + pathSep() + cons.RESOURCES);
    var count: number = 0;
    files.forEach(function (row, index) {
        if (row.indexOf(ending) > -1) {
            count += 1;
        }
    });
    return count;
}