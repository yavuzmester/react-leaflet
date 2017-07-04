"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require("./path");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var MultiPolyline = (function (_super) {
    __extends(MultiPolyline, _super);
    function MultiPolyline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiPolyline.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.MultiPolyline(this.props.polylines, path_1.Path.createLeafletOptions(underscore_1.omit(this.props, "polylines")));
    };
    MultiPolyline.prototype.render = function () {
        return null;
    };
    MultiPolyline.prototype.componentDidUpdate = function (prevProps) {
        _super.prototype.componentDidUpdate.call(this, prevProps);
        var leafletElement = this.leafletElement;
        if (this.props.polylines !== prevProps.polylines) {
            leafletElement.setLatLngs(this.props.polylines);
        }
    };
    return MultiPolyline;
}(path_1.Path));
exports.MultiPolyline = MultiPolyline;
//# sourceMappingURL=multi-polyline.js.map