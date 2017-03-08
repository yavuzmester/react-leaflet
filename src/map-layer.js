"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var leaflet_1 = require("leaflet");
var MapLayer = (function (_super) {
    __extends(MapLayer, _super);
    function MapLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapLayer.prototype.componentWillMount = function () {
        this.initLeafletElement();
    };
    MapLayer.prototype.componentDidMount = function () {
        var leafletElement = this.leafletElement;
        (this.context.layerGroup || this.context.map).addLayer(leafletElement);
    };
    MapLayer.prototype.componentWillUnmount = function () {
        var leafletElement = this.leafletElement;
        (this.context.layerGroup || this.context.map).removeLayer(leafletElement);
        this.leafletElement = undefined;
    };
    return MapLayer;
}(react_1.PureComponent));
MapLayer.contextTypes = {
    map: react_1.PropTypes.instanceOf(leaflet_1.Map).isRequired,
    layerGroup: react_1.PropTypes.instanceOf(leaflet_1.LayerGroup)
};
exports.MapLayer = MapLayer;
