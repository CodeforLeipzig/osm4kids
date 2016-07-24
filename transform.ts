import fs = require('fs');
import { baseName, pathSep } from "./helpers";
import * as cons from "./constants";

var _ = require('lodash');
var geojson = require('geojson');

export class TransformJob {

    constructor() {

    }

    transform_overpass_to_clean() {
        //var base_dir = process.cwd();
        //var complete_transform_dir = base_dir + pathSep() + transform_dir;

        transform_to_clean(cons.BASE_DIR + pathSep() + cons.RESOURCES);
    }
    merge_overpass_with_kidsle_kb() {
        //var base_dir = process.cwd();
        //var complete_query_dir = base_dir + pathSep() + query_dir;
        //var complete_transform_dir = base_dir + pathSep() + transform_dir + pathSep();

        merge_overpass_with_kidsle_kb(cons.BASE_DIR + pathSep() + cons.RESOURCES);
    }
}

function transform_to_clean(complete_transform_dir: string) {

    fs.readdir(complete_transform_dir, function (err, query_files) {
        if (err) throw err;
        for (var i in query_files) {

            /* do not retransform transformed files */
            if (_.endsWith(query_files[i], '.geojson') && !_.endsWith(query_files[i], '_clean.geojson')) {

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
    var count: number = 0;
    fs.readdir(complete_transform_dir, function (err, query_files) {
        if (err) throw err;
        for (var i in query_files) {

            if (_.endsWith(query_files[i], cons.ENDING_KIDSLE_KB)) {

                /* product means information-type like playgrounds, schools, doctors or daycare */
                var product = _.replace(query_files[i], cons.ENDING_KIDSLE_KB, '');

                var full_path_kidsle_kb_file = complete_transform_dir + pathSep() + query_files[i];
                var full_path_overpass_file = complete_transform_dir + pathSep() + _.replace(query_files[i], cons.ENDING_KIDSLE_KB, cons.ENDING_OP_CLEAN);

                console.log("full_path_kidsle_kb_file: " + full_path_kidsle_kb_file);
                console.log("full_path_overpass_file:  " + full_path_overpass_file);

                var content_kidsle_kb_file = fs.readFileSync(full_path_kidsle_kb_file).toString();
                var content_overpass_file = fs.readFileSync(full_path_overpass_file).toString();
                //console.log("size kidsle kb: "+ content_kidsle_kb_file.length+ " size overpass: "+content_overpass_file.length);

                var xxx_content_overpass_file = JSON.parse(content_overpass_file)['features'];
                var xxx_content_kidsle_kb_file = JSON.parse(content_kidsle_kb_file)['features'];
                //console.log(xxx_content_overpass_file);

                let retArr2: any[] = [];

                _(xxx_content_overpass_file).forEach(function (value_op) {
                    var lon: string = value_op['geometry']['coordinates'][0];
                    var lat: string = value_op['geometry']['coordinates'][1];

                    var kidsle_additonal_information = new Array();
                    _(xxx_content_kidsle_kb_file).forEach(function (value_k) {
                        if (lat == value_k['geometry']['coordinates'][1] && lon == value_k['geometry']['coordinates'][0]) {
                            kidsle_additonal_information = value_k['properties'];
                        }
                        else {
                        }

                    });

                    retArr2.push({
                        id: value_op['id'],
                        longitude: value_op['geometry']['coordinates'][0],
                        latitude: value_op['geometry']['coordinates'][1],
                        tags: _.assign(value_op['properties']['tags'], kidsle_additonal_information)
                    });
                });

                let retArr_geoJson2: any = geojson.parse(retArr2, { Point: ['latitude', 'longitude'] });
                let target_fileName: string = complete_transform_dir + pathSep() + product + cons.ENDING_OP_CLEAN_MERGE_KIDSLE;

                fs.writeFile(target_fileName, JSON.stringify(retArr_geoJson2, null, 2), (err) => {
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