"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_layer_1 = require("./map-layer");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var ImageOverlay = (function (_super) {
    __extends(ImageOverlay, _super);
    function ImageOverlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageOverlay.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.ImageOverlay(this.props.url, this.props.bounds, underscore_1.omit(this.props, "url", "bounds"));
    };
    ImageOverlay.prototype.render = function () {
        return null;
    };
    ImageOverlay.prototype.componentDidUpdate = function (prevProps) {
        var leafletElement = this.leafletElement;
        if (this.props.url !== prevProps.url) {
            leafletElement.setUrl(this.props.url);
        }
        if (this.props.opacity !== prevProps.opacity) {
            leafletElement.setOpacity(this.props.opacity);
        }
    };
    return ImageOverlay;
}(map_layer_1.MapLayer));
exports.ImageOverlay = ImageOverlay;
//# sourceMappingURL=image-overlay.js.map