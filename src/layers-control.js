"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var map_control_1 = require("./map-control");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var autobind = require("autobind-decorator");
/**
 * when the layers are to be changed, unmount and remount the component via "key".
 */
var LayersControl = (function (_super) {
    __extends(LayersControl, _super);
    function LayersControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayersControl.prototype.initLeafletElement = function () {
        var _this = this;
        var baseLayers = this.props.baseLayers.reduce(function (memo, b) {
            var dummyBaseLayer = new leaflet_1.LayerGroup();
            if (b.name === _this.props.checkedBaseLayer) {
                _this.context.map.addLayer(dummyBaseLayer);
            }
            memo[b.title] = dummyBaseLayer;
            return memo;
        }, {});
        var overlays = this.props.overlays.reduce(function (memo, o) {
            var dummyOverlay = new leaflet_1.LayerGroup();
            if (o.checked) {
                _this.context.map.addLayer(dummyOverlay);
            }
            memo[o.title] = dummyOverlay;
            return memo;
        }, {});
        this.leafletElement = new leaflet_1.Control.Layers(baseLayers, overlays, { position: this.props.position });
    };
    LayersControl.prototype.render = function () {
        return null;
    };
    LayersControl.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.context.map.on("baselayerchange", this.onBaseLayerChange);
        this.context.map.on("overlayadd", this.onOverlayAdd);
        this.context.map.on("overlayremove", this.onOverlayRemove);
    };
    LayersControl.prototype.getOverlays = function () {
        var _this = this;
        var leafletMap = this.context.map, layersControl = this.leafletElement;
        return underscore_1.values(layersControl._layers).filter(function (layer) { return layer.overlay; }).map(function (overlay) {
            var overlayTitle = overlay.name, overlayName = _this._getOverlayName(overlayTitle);
            return {
                name: overlayName,
                title: overlayTitle,
                checked: leafletMap.hasLayer(overlay.layer)
            };
        });
    };
    LayersControl.prototype.onBaseLayerChange = function (e) {
        if (this.props.onBaseLayerChange) {
            var baseLayerTitle = e.name, baseLayerName = this._getBaseLayerName(baseLayerTitle);
            this.props.onBaseLayerChange(baseLayerName);
        }
    };
    LayersControl.prototype.onOverlayAdd = function (e) {
        if (this.props.onOverlayAdd) {
            var overlayTitle = e.name, overlayName = this._getOverlayName(overlayTitle);
            this.props.onOverlayAdd(overlayName);
        }
    };
    LayersControl.prototype.onOverlayRemove = function (e) {
        if (this.props.onOverlayRemove) {
            var overlayTitle = e.name, overlayName = this._getOverlayName(overlayTitle);
            this.props.onOverlayRemove(overlayName);
        }
    };
    LayersControl.prototype._getBaseLayerName = function (title) {
        return (this.props.baseLayers.find(function (b) { return b.title === title; }) || { name: undefined }).name;
    };
    LayersControl.prototype._getOverlayName = function (title) {
        return (this.props.overlays.find(function (b) { return b.title === title; }) || { name: undefined }).name;
    };
    LayersControl.prototype.componentWillUnmount = function () {
        this.context.map.removeEventListener("baselayerchange", this.onBaseLayerChange);
        this.context.map.removeEventListener("overlayadd", this.onOverlayAdd);
        this.context.map.removeEventListener("overlayremove", this.onOverlayRemove);
        this._removeLayers();
        _super.prototype.componentWillUnmount.call(this);
    };
    LayersControl.prototype._removeLayers = function () {
        var _this = this;
        var layersControl = this.leafletElement;
        underscore_1.forEach(layersControl._layers, function (l) {
            _this.context.map.removeLayer(l.layer); //l.layer is insane here, but that is how Leaflet is!
        });
    };
    return LayersControl;
}(map_control_1.MapControl));
__decorate([
    autobind
], LayersControl.prototype, "onBaseLayerChange", null);
__decorate([
    autobind
], LayersControl.prototype, "onOverlayAdd", null);
__decorate([
    autobind
], LayersControl.prototype, "onOverlayRemove", null);
exports.LayersControl = LayersControl;
//# sourceMappingURL=layers-control.js.map