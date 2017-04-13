"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_layer_1 = require("./map-layer");
var underscore_1 = require("underscore");
function createLeafletOptions(pathOptions) {
    if (typeof pathOptions === "undefined") {
        return {};
    }
    else {
        var options = underscore_1.pick(pathOptions, "fill", "fillColor", "fillOpacity", "fillRule", "stroke", "clickable", "pointerEvents", "className", "TYPE");
        options.color = pathOptions.strokeColor || pathOptions.fillColor;
        if (!underscore_1.isUndefined(pathOptions.strokeWeight)) {
            options.weight = pathOptions.strokeWeight;
        }
        if (!underscore_1.isUndefined(pathOptions.strokeOpacity)) {
            options.opacity = pathOptions.strokeOpacity;
        }
        if (!underscore_1.isUndefined(pathOptions.strokeDashArray)) {
            options.dashArray = pathOptions.strokeDashArray;
        }
        if (!underscore_1.isUndefined(pathOptions.strokeLineCap)) {
            options.lineCap = pathOptions.strokeLineCap;
        }
        if (!underscore_1.isUndefined(pathOptions.strokeLineJoin)) {
            options.lineJoin = pathOptions.strokeLineJoin;
        }
        return options;
    }
}
var Path = (function (_super) {
    __extends(Path, _super);
    function Path() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Path.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var leafletElement = this.leafletElement;
        if (typeof this.props.style !== "undefined") {
            if (typeof this.props.style === "function") {
                leafletElement.setStyle(this.props.style);
            }
            else {
                var style = createLeafletOptions(this.props.style);
                leafletElement.setStyle(style);
            }
        }
    };
    Path.prototype.componentDidUpdate = function (prevProps) {
        var leafletElement = this.leafletElement;
        if (typeof this.props.style === "function") {
            leafletElement.setStyle(this.props.style);
        }
        else {
            var style = createLeafletOptions(this.props.style || this.props), prevStyle = createLeafletOptions(prevProps.style || prevProps);
            if (!underscore_1.isEqual(style, prevStyle)) {
                leafletElement.setStyle(style);
            }
        }
    };
    return Path;
}(map_layer_1.MapLayer));
Path.createLeafletOptions = createLeafletOptions;
exports.Path = Path;
