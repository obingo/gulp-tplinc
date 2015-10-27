/*
 * Copyright (c) 2015 xsbchen
 * Licensed under the MIT license.
 */

'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var Tplinc = require('tplinc');

var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-tplinc';

module.exports = function (options) {
    options = options || {};

    var tplinc = new Tplinc(options);

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        var chunk = String(file.contents);
        chunk = tplinc.process(file.path, chunk);
        file.contents = new Buffer(chunk);

        cb(null, file);
    });
};
