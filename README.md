# OSM4kids

## Introduction

Nodejs, Typescript and OSM based map for parents in Leipzig. Inspired by Kidsle ([Github](https://github.com/CodeforLeipzig/kidsle/) and [page](http://leipzig.codefor.de/kidsle/)).
The frontend [takka-tukka](https://github.com/paesku/takka-tukka) can be found there.

## Requirements

### npm Packages

Install all packages where definite in the package.json
```sh
# npm install
```

### typings
To have code completion in your editor, you need typescript definitions (d.ts).

```sh
# npm install typings
```

To install the Typescript-defintions you need:


```shell
# typings install --save --ambient node
# typings install --save --ambient lodash
# typings install --save --ambient express
# typings install --save --ambient serve-static
# typings install --save --ambient mime
# typings install --save --ambient body-parser

```

insert in your .ts-file to have autocomplete

```xml
/// <reference path="typings/main.d.ts" />
```

## how to run ...

Build:
```sh
# tsc index.ts
```

Run:
```sh
# node index.js
```
=======
# OSM4kids

## Introduction

Nodejs, Typescript and OSM based map for parents in Leipzig. Inspired by Kidsle ([Github](https://github.com/CodeforLeipzig/kidsle/) and [Portal](http://leipzig.codefor.de/kidsle/)).
This repo contains the backend only.
The frontend [takka-tukka](https://github.com/paesku/takka-tukka) can be found there.

## Requirements

To use this project you need to install the javascript-server [Node.js](https://nodejs.org).
Node.js comes with a packetmanager called [npm](https://www.npmjs.com/).
It is recommended to install the following two npm-packages globally, so the executables can be launched from any path.

```sh
# npm install --global typescript
# npm install --global typings
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
# tsc index.ts
```

Run:
```sh
# node index.js
```

Try it in your browser:
```sh
# http://localhost:8000/api/playgrounds/
```
