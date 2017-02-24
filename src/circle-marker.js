"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require("./path");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var CircleMarker = (function (_super) {
    __extends(CircleMarker, _super);
    function CircleMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircleMarker.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.CircleMarker(this.props.center, underscore_1.omit(this.props, "center"));
    };
    CircleMarker.prototype.render = function () {
        return null;
    };
    CircleMarker.prototype.componentDidUpdate = function (prevProps) {
        _super.prototype.componentDidUpdate.call(this, prevProps);
        var leafletElement = this.leafletElement;
        if (this.props.center !== prevProps.center) {
            leafletElement.setLatLng(this.props.center);
        }
        if (this.props.radius !== prevProps.radius) {
            leafletElement.setRadius(this.props.radius);
        }
    };
    return CircleMarker;
}(path_1.Path));
exports.CircleMarker = CircleMarker;
