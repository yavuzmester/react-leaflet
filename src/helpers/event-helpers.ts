import {Events} from "../types";

import {clone, forEach} from 'underscore';

const EVENTS_RE = /^on(.+)$/i;

function extractEvents(props: Object): Events {
    return Object.keys(props).reduce((memo, prop) => {
        if (EVENTS_RE.test(prop)) {
            const key = prop.replace(EVENTS_RE, (match, p) => p.toLowerCase());
            memo[key] = props[prop];
        }

        return memo;
    }, {});
}

function bindEvents(el: any, leafletEvents: Events): void {
    forEach(leafletEvents, (cb, ev) => {
        el.on(ev, cb);
    });
}

function unbindEvents(el: any, leafletEvents: Events): void {
    forEach(leafletEvents, (cb, ev) => {
        el.off(ev, cb);
    });
}

export {
    extractEvents,
    bindEvents,
    unbindEvents
};
