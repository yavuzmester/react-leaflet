"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_control_1 = require("./map-control");
var leaflet_1 = require("leaflet");
var LayersControl = (function (_super) {
    __extends(LayersControl, _super);
    function LayersControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayersControl.prototype.initLeafletElement = function () {
        var _this = this;
        var baseLayers = this.props.baseLayers.reduce(function (memo, b) {
            var layerGroup = new leaflet_1.LayerGroup();
            if (b.title === _this.props.checkedBaseLayer) {
                layerGroup.addTo(_this.context.map);
            }
            memo[b.title] = layerGroup;
            return memo;
        }, {});
        var overlays = this.props.overlays.reduce(function (memo, o) {
            var layerGroup = new leaflet_1.LayerGroup();
            if (o.checked) {
                layerGroup.addTo(_this.context.map);
            }
            memo[o.title] = layerGroup;
            return memo;
        }, {});
        this.leafletElement = new leaflet_1.Control.Layers(baseLayers, overlays, { position: this.props.position });
    };
    LayersControl.prototype.render = function () {
        return null;
    };
    LayersControl.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        if (this.props.onOverlayAdd) {
            this.context.map.on("overlayadd", this.props.onOverlayAdd);
        }
        if (this.props.onOverlayRemove) {
            this.context.map.on("overlayremove", this.props.onOverlayRemove);
        }
        if (this.props.onBaseLayerChange) {
            this.context.map.on("baselayerchange", this.props.onBaseLayerChange);
        }
    };
    LayersControl.prototype.componentDidUpdate = function () {
        _super.prototype.componentWillUnmount.call(this);
        _super.prototype.componentWillMount.call(this);
        _super.prototype.componentDidMount.call(this);
    };
    LayersControl.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        if (this.props.onOverlayAdd) {
            this.context.map.removeEventListener("overlayadd", this.props.onOverlayAdd);
        }
        if (this.props.onOverlayRemove) {
            this.context.map.removeEventListener("overlayremove", this.props.onOverlayRemove);
        }
        if (this.props.onBaseLayerChange) {
            this.context.map.removeEventListener("baselayerchange", this.props.onBaseLayerChange);
        }
    };
    return LayersControl;
}(map_control_1.MapControl));
exports.LayersControl = LayersControl;
