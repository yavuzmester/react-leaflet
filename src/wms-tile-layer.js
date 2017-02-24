"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tile_layer_1 = require("./tile-layer");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var WMSTileLayer = (function (_super) {
    __extends(WMSTileLayer, _super);
    function WMSTileLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WMSTileLayer.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.TileLayer.WMS(this.props.url, underscore_1.omit(this.props, "url"));
    };
    return WMSTileLayer;
}(tile_layer_1.TileLayer));
exports.WMSTileLayer = WMSTileLayer;
