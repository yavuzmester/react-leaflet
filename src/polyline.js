"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require("./path");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var Polyline = (function (_super) {
    __extends(Polyline, _super);
    function Polyline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Polyline.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.Polyline(this.props.latLngs, path_1.Path.createLeafletOptions(underscore_1.omit(this.props, "bounds")));
    };
    Polyline.prototype.render = function () {
        return null;
    };
    Polyline.prototype.componentDidUpdate = function (prevProps) {
        _super.prototype.componentDidUpdate.call(this, prevProps);
        var leafletElement = this.leafletElement;
        if (this.props.latLngs !== prevProps.latLngs) {
            leafletElement.setLatLngs(this.props.latLngs);
        }
    };
    return Polyline;
}(path_1.Path));
exports.Polyline = Polyline;
