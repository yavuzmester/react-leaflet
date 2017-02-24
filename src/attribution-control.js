"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_control_1 = require("./map-control");
var leaflet_1 = require("leaflet");
var AttributionControl = (function (_super) {
    __extends(AttributionControl, _super);
    function AttributionControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AttributionControl.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.Control.Attribution(this.props);
    };
    AttributionControl.prototype.render = function () {
        return null;
    };
    return AttributionControl;
}(map_control_1.MapControl));
exports.AttributionControl = AttributionControl;
