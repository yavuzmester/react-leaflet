"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require("./path");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.Rectangle(this.props.bounds, path_1.Path.createLeafletOptions(underscore_1.omit(this.props, "bounds")));
    };
    Rectangle.prototype.render = function () {
        return null;
    };
    Rectangle.prototype.componentDidUpdate = function (prevProps) {
        _super.prototype.componentDidUpdate.call(this, prevProps);
        var leafletElement = this.leafletElement;
        if (this.props.bounds !== prevProps.bounds) {
            leafletElement.setBounds(this.props.bounds);
        }
    };
    return Rectangle;
}(path_1.Path));
exports.Rectangle = Rectangle;
//# sourceMappingURL=rectangle.js.map