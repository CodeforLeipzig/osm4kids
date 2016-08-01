# OSM4kids ![build status](https://travis-ci.org/hcrudolph/osm4kids-backend.svg?branch=master)

## Introduction

Nodejs, Typescript and OSM based map for parents in Leipzig. Inspired by Kidsle ([Github](https://github.com/CodeforLeipzig/kidsle/) and [Portal](http://leipzig.codefor.de/kidsle/)).
This repo contains the backend only.
The frontend [takka-tukka](https://github.com/paesku/takka-tukka) can be found there.

## Requirements

To use this project you need to install the javascript-server [Node.js](https://nodejs.org).
Node.js comes with a packetmanager called [npm](https://www.npmjs.com/).
It is recommended to install the following two npm-packages globally, so the executables can be launched from any path.

```sh
# npm install -g typescript
# npm install -g typings
```
[Typescript](http://www.typescriptlang.org/) is a javascript compiler and
[Typings](https://www.npmjs.com/package/typings) is needed to bring codecompletion / intellisense in your editor.
Every javascript-library has their own codecompletion definitions file (d.ts). These Files are stored in the _typings_-folder.


Before you can start, you need to install the required npm packages.
```sh
# npm install
```
Now all packages where included in the package.json will be installed.

## how to run ...

Build:
```sh
# npm tsc
```

Test:
```sh
# npm test
```

Run:
```sh
# npm start
```

Try it in your browser:
```sh
# http://localhost:8000/api/playgrounds/
```

## CHANGELOG 

### 0.0.4
* new feature: Transform the overpass result to a simpler geojson-structure

### 0.0.3
* new feature: Simple test suite using Mocha and Chai

### 0.0.2
* new feature: Export utility functions to dedicated helper module

### 0.0.1
* new feature: Cronjob that frequently query overpass-api using the npm package 'query-overpass'

### 0.0.0
* Initial commit

## TODOs
* outsource `fs.unlink` and `fs.writefile` to helpers.ts
* filter tags in `_OP_clean_merge_kidsle.geojson` with settings in constants.ts selections-section
* syncron sequence: `[1]download OP -> [2]create clean_OP -> [3]merge OP with kidsle`. no async-behaviour that finished step [3] before step [1]
* the bounding-box of kidsle is bigger than the overpass-queries -> correct the queries
* if no `/resources/*_OP.geojson` exist, force download