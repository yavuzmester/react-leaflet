"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var map_layer_1 = require("./map-layer");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
function prepareCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    //smooth rendering
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
}
var CanvasTileLayer = (function (_super) {
    __extends(CanvasTileLayer, _super);
    function CanvasTileLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanvasTileLayer.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.TileLayer.Canvas(this.props);
    };
    CanvasTileLayer.prototype.render = function () {
        return null;
    };
    CanvasTileLayer.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this._draw();
    };
    CanvasTileLayer.prototype.componentDidUpdate = function (prevProps) {
        var leafletElement = this.leafletElement;
        if (this.props.opacity !== prevProps.opacity) {
            leafletElement.setOpacity(this.props.opacity);
        }
        this._draw();
    };
    CanvasTileLayer.prototype._draw = function () {
        var _this = this;
        var leafletElement = this.leafletElement;
        leafletElement._reset();
        leafletElement._update();
        underscore_1.forEach(leafletElement._tiles, function (canvas) {
            var tile = __assign({}, canvas._tilePoint, { zoom: _this.context.map.getZoom() });
            prepareCanvas(canvas);
            _this.drawTile(canvas, tile);
        });
    };
    return CanvasTileLayer;
}(map_layer_1.MapLayer));
CanvasTileLayer.defaultProps = {
    noWrap: true,
    opacity: 1
};
exports.CanvasTileLayer = CanvasTileLayer;
//# sourceMappingURL=canvas-tile-layer.js.map