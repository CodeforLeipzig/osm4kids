import fs = require('fs');
import { baseName, pathSep } from "./helpers";
var _ = require('lodash');
var geojson = require('GeoJSON');

export class TransformJob {

    constructor() {
    }

    transform(transform_dir: string) {
        var base_dir = process.cwd();
        var complete_transform_dir = base_dir + pathSep() + transform_dir;

        startTransform(complete_transform_dir);
    }
}

function startTransform(complete_transform_dir: string) {

    fs.readdir(complete_transform_dir, function (err, query_files) {
        if (err) throw err;
        for (var i in query_files) {

            /* do not retransform transformed files */
            if (_.endsWith(query_files[i], '.geojson') && !_.endsWith(query_files[i], '_clean.geojson')) {

                let file_to_transform: string = complete_transform_dir + pathSep() + query_files[i];

                let retArr: any[] = [];

                fs.readFile(file_to_transform, 'utf8', function (err, file_content) {
                    if (err) throw err;

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
                    let retArr_geoJson:any = geojson.parse(retArr, {Point: ['latitude', 'longitude']});
                    
                    // write file with indention
                    fs.writeFile(target_fileName, JSON.stringify(retArr_geoJson, null, 2), (err) => {
                        if (err) {
                            // throw err;
                            console.log('not successfully created ' + target_fileName);
                        }
                        console.log('successfully created ' + target_fileName);

                    });

                });

            }
        }
    });
}
