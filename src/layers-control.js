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
        var baseLayers = this.props.baseLayers.reduce(function (memo, b) {
            memo[b.title] = new leaflet_1.LayerGroup();
            return memo;
        }, {});
        var overlays = this.props.overlays.reduce(function (memo, o) {
            memo[o.title] = new leaflet_1.LayerGroup();
            return memo;
        }, {});
        this.leafletElement = new leaflet_1.Control.Layers(baseLayers, overlays, { position: this.props.position });
    };
    LayersControl.prototype.render = function () {
        return null;
    };
    LayersControl.prototype.componentDidUpdate = function () {
        _super.prototype.componentWillUnmount.call(this);
        _super.prototype.componentDidMount.call(this);
    };
    return LayersControl;
}(map_control_1.MapControl));
exports.LayersControl = LayersControl;
