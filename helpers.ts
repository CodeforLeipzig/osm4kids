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