import { baseName, pathSep } from "./helpers";
import * as cons from "./constants";

var fs = require('fs');
var schedule = require('node-schedule');
var overpass = require('query-overpass');
export class OverpassJob {
    private job: any;
    constructor (schedule_string: string,
                 rel_query_dir: string,
                 rel_target_dir: string) {
        var base_dir = process.cwd();
        var complete_query_dir = base_dir + pathSep() + rel_query_dir;
        var complete_target_dir = base_dir + pathSep() + rel_target_dir;
        this.job = schedule.scheduleJob(schedule_string, function () {
            startJob(complete_query_dir, complete_target_dir)
        });
    }
}

function startJob (query_dir: string, target_dir: string) {
    fs.readdir(query_dir, function(err, query_files) {
        if (err) throw err;
        for (var i in query_files) {
            var query_file = query_dir + pathSep() + query_files[i];
            var target_file = target_dir + pathSep() + baseName(query_files[i]) + cons.ENDING_OP;
            writeTargetFile(query_file, target_file);
        }
    });
}

function writeTargetFile (query_file: string, target_file: string) {
    fs.readFile(query_file, 'utf8', function(err, query) {
        if (err) throw err;
        overpass(query, function(err, data) {
            fs.writeFile(target_file, JSON.stringify(data), function(err) {
                if (err) throw err;
                console.log('successfully wrote file ' + target_file);
            });
        });
    });
}
