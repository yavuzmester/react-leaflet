"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_control_1 = require("./map-control");
var leaflet_1 = require("leaflet");
/**
 * You can define leaflet-zoom-control class in your css file, e.g.
.leaflet-zoom-control {
  width: 60px;
  height: 22px;
  text-align: center;
  font: bold 12px/20px Tahoma, Verdana, sans-serif;
  background-color: white;
  cursor: default;
}
 */
var ZoomControl = (function (_super) {
    __extends(ZoomControl, _super);
    function ZoomControl(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._updateMapZoom = _this._updateMapZoom.bind(_this);
        return _this;
    }
    ZoomControl.prototype.initLeafletElement = function () {
        var leafletElement = new leaflet_1.Control.Zoom(this.props);
        leafletElement.onAdd = function () {
            var container = leaflet_1.DomUtil.create("div", "leaflet-zoom-control leaflet-bar-part leaflet-bar");
            leafletElement._container = container;
            return container;
        };
        this.leafletElement = leafletElement;
    };
    ZoomControl.prototype.render = function () {
        return null;
    };
    ZoomControl.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this._updateMapZoom();
        this.context.map.on("zoomend", this._updateMapZoom);
    };
    ZoomControl.prototype.componentWillUnmount = function () {
        this.context.map.off("zoomend", this._updateMapZoom);
    };
    ZoomControl.prototype._updateMapZoom = function () {
        var leafletElement = this.leafletElement;
        leafletElement._container.innerHTML = "zoom:" + this.context.map.getZoom();
    };
    return ZoomControl;
}(map_control_1.MapControl));
exports.ZoomControl = ZoomControl;
