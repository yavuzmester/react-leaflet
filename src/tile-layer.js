"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_layer_1 = require("./map-layer");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var TileLayer = (function (_super) {
    __extends(TileLayer, _super);
    function TileLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TileLayer.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.TileLayer(this.props.url, underscore_1.omit(this.props, "url"));
    };
    TileLayer.prototype.render = function () {
        return null;
    };
    TileLayer.prototype.componentDidUpdate = function (prevProps) {
        var leafletElement = this.leafletElement;
        if (this.props.url !== prevProps.url) {
            leafletElement.setUrl(this.props.url);
        }
        if (this.props.opacity !== prevProps.opacity) {
            leafletElement.setOpacity(this.props.opacity);
        }
    };
    return TileLayer;
}(map_layer_1.MapLayer));
TileLayer.defaultProps = {
    noWrap: true,
    opacity: 1
};
exports.TileLayer = TileLayer;
