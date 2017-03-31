"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require("./path");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Polygon.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.Polygon(this.props.bounds, path_1.Path.createLeafletOptions(underscore_1.omit(this.props, "bounds")));
    };
    Polygon.prototype.render = function () {
        return null;
    };
    Polygon.prototype.componentDidUpdate = function (prevProps) {
        _super.prototype.componentDidUpdate.call(this, prevProps);
        var leafletElement = this.leafletElement;
        if (this.props.bounds !== prevProps.bounds) {
            leafletElement.setLatLngs(this.props.bounds);
        }
    };
    return Polygon;
}(path_1.Path));
exports.Polygon = Polygon;
