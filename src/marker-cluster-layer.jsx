"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_layer_1 = require("./map-layer");
var LeafletMarkerCluster = require("leaflet.markercluster");
var leaflet_1 = require("leaflet");
var markerIcon = new leaflet_1.Icon({
    iconUrl: "https://asmaloney.com/wp-content/themes/asmaloney/maps_cluster/images/pin24.png",
    iconRetinaUrl: "https://asmaloney.com/wp-content/themes/asmaloney/maps_cluster/images/pin48.png",
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14]
});
var MarkerClusterLayer = (function (_super) {
    __extends(MarkerClusterLayer, _super);
    function MarkerClusterLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkerClusterLayer.prototype.initLeafletElement = function () {
        this.leafletElement = new LeafletMarkerCluster();
    };
    MarkerClusterLayer.prototype.render = function () {
        return null;
    };
    MarkerClusterLayer.prototype.componentDidMount = function () {
        var _this = this;
        _super.prototype.componentDidMount.call(this);
        var leafletElement = this.leafletElement;
        leafletElement.addLayers(this.props.data.map(function (d) { return _this._datumToMarker(d); }));
    };
    MarkerClusterLayer.prototype._datumToMarker = function (datum) {
        var marker = new leaflet_1.Marker([datum.lat, datum.lng], { icon: markerIcon });
        var popupHtml = this._datumToPopupHtml(datum);
        return marker.bindPopup(popupHtml);
    };
    MarkerClusterLayer.prototype._datumToPopupHtml = function (datum) {
        return Object.keys(datum).reduce(function (memo, key) {
            if (key !== "lat" && key !== "lng") {
                return memo + ("<br/><b>" + key + ":</b>  " + datum[key]);
            }
            else {
                return memo;
            }
        }, "");
    };
    return MarkerClusterLayer;
}(map_layer_1.MapLayer));
exports.MarkerClusterLayer = MarkerClusterLayer;
