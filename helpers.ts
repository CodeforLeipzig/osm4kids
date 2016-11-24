import fs = require('fs');

export function pathSep() {
    if (/^win/.test(process.platform)) {
        return ('\\');
    } else {
        return ('/');
    }
}

export function baseName(str) {
    var base = new String(str).substring(str.lastIndexOf(pathSep()) + 1);
    if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}

export function delete_file(target_fileName) {
    fs.unlink(target_fileName, (err) => {
        if (err) {
            // throw err;
            console.log('not successfully deleted ' + target_fileName);
        }
        console.log('successfully deleted ' + target_fileName);
    });
}


export function write_file(target_fileName, retArr_geoJson) {
    // write file with indention
    fs.writeFile(target_fileName, JSON.stringify(retArr_geoJson, null, 2), (err) => {
        if (err) {
            // throw err;
            console.log('not successfully created ' + target_fileName);
        }
        console.log('successfully created ' + target_fileName);

    });

}