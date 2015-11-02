/* jshint node: true */

var gulp        = require('gulp'),
    concat      = require("gulp-concat"),
    download    = require("gulp-download"),
    footer      = require('gulp-footer'),
    _           = require('underscore'),
    del         = require('del'),
    fs          = require('fs');

function loadConfig () {
    var cfgFile = './config.json', 
        cfg = require(cfgFile);

    if (!cfg) {
        console.error('[Shift] Error: can not load config "');
        return;
    }
    return cfg;
}

function loadTpl () {
    var tpl = fs.readFileSync('./lib/gulp_tasks/shift/tpl.js');
    return tpl;
}

function makeShiftMap(collections) {
    var arr = [];
    _.each(collections, function(c) {
        if (c.to) {
            arr.push('"' + c.name + '":"' + c.to + '"');
        }
    });
    return "{" + arr.join(',') + "}";
}

gulp.task('shift', ['clean:shift'], function() {
    var cfg = loadConfig(),
        tpl = loadTpl();

    if (cfg && tpl) {
        download(cfg.base)
            .pipe(concat(cfg.destFile))
            .pipe(footer(tpl, {
                cl: _.pluck(cfg.collections, 'name'),
                map: makeShiftMap(cfg.collections)
            }))
            .pipe(gulp.dest(cfg.destDir));
    }
});

gulp.task('clean:shift', function (cb) {
    var cfg = loadConfig();
    if (cfg) {
        del([
            cfg.destDir + '/' + cfg.destFile
        ], cb);
    }
});
