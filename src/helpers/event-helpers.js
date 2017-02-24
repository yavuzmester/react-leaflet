"use strict";
var underscore_1 = require("underscore");
var EVENTS_RE = /^on(.+)$/i;
function extractEvents(props) {
    return Object.keys(props).reduce(function (memo, prop) {
        if (EVENTS_RE.test(prop)) {
            var key = prop.replace(EVENTS_RE, function (match, p) { return p.toLowerCase(); });
            memo[key] = props[prop];
        }
        return memo;
    }, {});
}
exports.extractEvents = extractEvents;
function bindEvents(el, leafletEvents) {
    underscore_1.forEach(leafletEvents, function (cb, ev) {
        el.on(ev, cb);
    });
}
exports.bindEvents = bindEvents;
function unbindEvents(el, leafletEvents) {
    underscore_1.forEach(leafletEvents, function (cb, ev) {
        el.off(ev, cb);
    });
}
exports.unbindEvents = unbindEvents;
