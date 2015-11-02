!(function(win, $) {
    "use strict";
    $.ajaxPrefilter(function(opt, origOpt) {
        var loc = win.location,
            rCollections = /\/(<%= cl.join("|") %>)(\/([0-9|a-z|A-Z|_]*))?(\.|$)/,
            match,
            to = '/assets/fixtures/',
            map = $.parseJSON('<%= map %>'),
            param = /[?&]shift=([^&]+)/.exec(loc.search);

        if (loc.hostname !== 'localhost') {
            return;
        }

        if (param && param[1] === 'noshift') {
            return;
        }

        if (rCollections) {
            match = rCollections.exec(origOpt.url);
            if (match) {
                opt.url = to + match[1];
                if (map[match[1]]) {
                    opt.url += '/' + map[match[1]];
                }
                else {
                    opt.url += (match[2] ? match[2] : '/index');
                }
            }
        }

        if (match) {
            opt.url +=
                (param ? '_' + param[1] : '') + 
                (origOpt.type.toUpperCase() === 'GET' ? '' : '--' + origOpt.type) +
                '.json';
        }

    });

})(window, jQuery);
