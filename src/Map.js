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
        var map = this.leafletElement;
        return (React.createElement("div", { style: this.props.style }, map ? this.props.children : null));
    };
    Map.prototype.componentDidMount = function () {
        var domNode = react_dom_1.findDOMNode(this);
        var leafletElement = new leaflet_1.Map(domNode, __assign({}, underscore_1.omit(this.props, 'children', 'onLoad', 'onMoveend'), { attributionControl: false }));
        if (typeof this.props.bounds !== "undefined") {
            leafletElement.fitBounds(this.props.bounds);
        }
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
        var map = this.leafletElement, leafletEvents = this._leafletEvents, nextLeafletEvents = helpers_1.extractEvents(nextProps);
        helpers_1.unbindEvents(map, leafletEvents);
        helpers_1.bindEvents(map, nextLeafletEvents);
        this._leafletEvents = nextLeafletEvents;
    };
    Map.prototype.componentWillUnmount = function () {
        var map = this.leafletElement;
        map.remove();
        this.leafletElement = undefined;
        this._leafletEvents = {};
    };
    return Map;
}(react_1.PureComponent));
Map.propTypes = {
    children: react_1.PropTypes.oneOfType([
        react_1.PropTypes.arrayOf(react_1.PropTypes.node),
        react_1.PropTypes.node,
    ]).isRequired
};
Map.childContextTypes = {
    map: react_1.PropTypes.instanceOf(leaflet_1.Map)
};
exports.Map = Map;
