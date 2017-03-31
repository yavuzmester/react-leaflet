"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require("./path");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var GeoJSONLayer = (function (_super) {
    __extends(GeoJSONLayer, _super);
    function GeoJSONLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoJSONLayer.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.GeoJSON(this.props.geojson, path_1.Path.createLeafletOptions(underscore_1.omit(this.props, "geojson")));
    };
    GeoJSONLayer.prototype.render = function () {
        return null;
    };
    return GeoJSONLayer;
}(path_1.Path));
exports.GeoJSONLayer = GeoJSONLayer;
