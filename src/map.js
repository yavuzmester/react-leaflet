"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var helpers_1 = require("./helpers");
var React = require("react");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Map.prototype.render = function () {
        var leafletMap = this.leafletElement;
        return (React.createElement("div", { style: this.props.style }, leafletMap ? this.props.children : null));
    };
    Map.prototype.componentDidMount = function () {
        var domNode = react_dom_1.findDOMNode(this);
        var leafletElement = new leaflet_1.Map(domNode, __assign({}, underscore_1.omit(this.props, 'children', 'onLoad', 'onMoveend', 'onMouseover', 'onMousemove', 'onMouseout'), { attributionControl: false }));
        // if (typeof this.props.bounds !== "undefined") {
        //     leafletElement.fitBounds(this.props.bounds as any);
        // }
        leafletElement.setView(this.props.center, this.props.zoom);
        var leafletEvents = helpers_1.extractEvents(this.props);
        helpers_1.bindEvents(leafletElement, leafletEvents);
        this.leafletElement = leafletElement;
        this._leafletEvents = leafletEvents;
        this.forceUpdate();
    };
    Map.prototype.getChildContext = function () {
        return {
            map: this.leafletElement
        };
    };
    Map.prototype.componentWillReceiveProps = function (nextProps) {
        var leafletMap = this.leafletElement, leafletEvents = this._leafletEvents, nextLeafletEvents = helpers_1.extractEvents(nextProps);
        var currentLeafletMapBounds = [
            leafletMap.getBounds().getSouthWest(),
            leafletMap.getBounds().getSouthEast(),
            leafletMap.getBounds().getNorthEast(),
            leafletMap.getBounds().getNorthWest()
        ];
        if ((nextProps.maxBounds !== this.props.maxBounds) && !areLatLngBoundsClose(nextProps.maxBounds, this.props.maxBounds)) {
            leafletMap.setMaxBounds(nextProps.maxBounds);
        }
        if (nextProps.maxZoom !== this.props.maxZoom) {
            leafletMap.options.maxZoom = nextProps.maxZoom;
        }
        if (!underscore_1.isEqual(nextProps.style, this.props.style)) {
            Object.assign(react_dom_1.findDOMNode(this).style, nextProps.style);
        }
        helpers_1.unbindEvents(leafletMap, leafletEvents);
        helpers_1.bindEvents(leafletMap, nextLeafletEvents);
        this._leafletEvents = nextLeafletEvents;
    };
    Map.prototype.fitBoundsWithoutEvents = function (bounds) {
        var leafletMap = this.leafletElement, leafletEvents = this._leafletEvents;
        helpers_1.unbindEvents(leafletMap, leafletEvents);
        leafletMap.fitBounds(bounds, { animate: false });
        helpers_1.bindEvents(leafletMap, leafletEvents);
    };
    Map.prototype.componentWillUnmount = function () {
        var _this = this;
        setTimeout(function () {
            var leafletMap = _this.leafletElement;
            leafletMap.remove();
            _this.leafletElement = undefined;
            _this._leafletEvents = {};
        }, 0);
    };
    return Map;
}(react_1.PureComponent));
Map.propTypes = {
    children: react_1.PropTypes.oneOfType([
        react_1.PropTypes.arrayOf(react_1.PropTypes.node),
        react_1.PropTypes.node,
    ])
};
Map.childContextTypes = {
    map: react_1.PropTypes.instanceOf(leaflet_1.Map)
};
exports.Map = Map;
function areLatLngBoundsClose(latLngBounds1, latLngBounds2) {
    if (latLngBounds1.length !== latLngBounds2.length) {
        return false;
    }
    else {
        for (var i in latLngBounds1) {
            var diff = latLngDifference(latLngBounds1[i], latLngBounds2[i]);
            if (diff > 1) {
                return false;
            }
        }
        return true;
    }
}
function latLngDifference(latLng1, latLng2) {
    return Math.sqrt(Math.pow(latLng1.lat - latLng2.lat, 2) +
        Math.pow(latLng1.lng - latLng2.lng, 2));
}
