"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_layer_1 = require("./map-layer");
var underscore_1 = require("underscore");
var STYLE_OPTION_NAMES = [
    'stroke',
    'color',
    'weight',
    'opacity',
    'fill',
    'fillColor',
    'fillOpacity',
    'fillRule',
    'dashArray',
    'lineCap',
    'lineJoin',
    'clickable',
    'pointerEvents',
    'className',
];
var Path = (function (_super) {
    __extends(Path, _super);
    function Path() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Path.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var leafletElement = this.leafletElement;
        if (typeof this.props.style !== "function") {
            var style = underscore_1.pick(this.props, STYLE_OPTION_NAMES);
            leafletElement.setStyle(style);
        }
        else {
            leafletElement.setStyle(this.props.style);
        }
    };
    Path.prototype.componentDidUpdate = function (prevProps) {
        var leafletElement = this.leafletElement;
        if (typeof this.props.style !== "function") {
            var style = underscore_1.pick(this.props, STYLE_OPTION_NAMES), prevStyle = underscore_1.pick(prevProps, STYLE_OPTION_NAMES);
            if (!underscore_1.isEqual(style, prevStyle)) {
                leafletElement.setStyle(style);
            }
        }
        else {
            leafletElement.setStyle(this.props.style);
        }
    };
    return Path;
}(map_layer_1.MapLayer));
exports.Path = Path;
