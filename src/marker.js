"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_layer_1 = require("./map-layer");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var Marker = (function (_super) {
    __extends(Marker, _super);
    function Marker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Marker.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.Marker(this.props.position, underscore_1.omit(this.props, "position"));
    };
    Marker.prototype.render = function () {
        return null;
    };
    Marker.prototype.componentDidUpdate = function (prevProps) {
        var leafletElement = this.leafletElement;
        if (this.props.position !== prevProps.position) {
            leafletElement.setLatLng(this.props.position);
        }
        if (this.props.icon !== prevProps.icon) {
            leafletElement.setIcon(this.props.icon);
        }
        if (this.props.opacity !== prevProps.opacity) {
            leafletElement.setOpacity(this.props.opacity);
        }
        if (this.props.draggable !== prevProps.draggable) {
            if (this.props.draggable) {
                leafletElement.dragging.enable();
            }
            else {
                leafletElement.dragging.disable();
            }
        }
        if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
            leafletElement.setZIndexOffset(this.props.zIndexOffset);
        }
    };
    return Marker;
}(map_layer_1.MapLayer));
Marker.defaultProps = {
    icon: new leaflet_1.Icon({
        iconUrl: "https://asmaloney.com/wp-content/themes/asmaloney/maps_cluster/images/pin24.png",
        iconRetinaUrl: "https://asmaloney.com/wp-content/themes/asmaloney/maps_cluster/images/pin48.png",
        iconSize: [29, 24],
        iconAnchor: [9, 21],
        popupAnchor: [0, -14]
    })
};
exports.Marker = Marker;
//# sourceMappingURL=marker.js.map