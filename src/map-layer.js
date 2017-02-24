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
    MapLayer.prototype.getName = function () {
        return this.props.name;
    };
    MapLayer.prototype.isChecked = function () {
        return !!this.props.checked;
    };
    MapLayer.prototype.componentWillMount = function () {
        this.initLeafletElement();
    };
    MapLayer.prototype.componentDidMount = function () {
        this._addSelf();
    };
    MapLayer.prototype.componentWillUnmount = function () {
        this._removeSelf();
        this.leafletElement = undefined;
    };
    MapLayer.prototype._addSelf = function () {
        var leafletElement = this.leafletElement;
        if (this.context.layersControl) {
            if (this.props.isBaseLayer) {
                this.context.layersControl.addBaseLayer(leafletElement, this.props.title || "");
            }
            else if (this.props.isOverlay) {
                this.context.layersControl.addOverlay(leafletElement, this.props.title || "");
            }
        }
        (this.context.layerGroup || this.context.map).addLayer(leafletElement);
    };
    MapLayer.prototype._removeSelf = function () {
        var leafletElement = this.leafletElement;
        if (this.context.layersControl) {
            this.context.layersControl.removeLayer(leafletElement);
        }
        (this.context.layerGroup || this.context.map).removeLayer(leafletElement);
    };
    return MapLayer;
}(react_1.PureComponent));
MapLayer.contextTypes = {
    map: react_1.PropTypes.instanceOf(leaflet_1.Map).isRequired,
    layerGroup: react_1.PropTypes.instanceOf(leaflet_1.LayerGroup),
    layersControl: react_1.PropTypes.instanceOf(leaflet_1.Control.Layers)
};
exports.MapLayer = MapLayer;
