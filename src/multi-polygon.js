"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require("./path");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var MultiPolygon = (function (_super) {
    __extends(MultiPolygon, _super);
    function MultiPolygon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiPolygon.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.MultiPolygon(this.props.polygons, path_1.Path.createLeafletOptions(underscore_1.omit(this.props, "polygons")));
    };
    MultiPolygon.prototype.render = function () {
        return null;
    };
    MultiPolygon.prototype.componentDidUpdate = function (prevProps) {
        _super.prototype.componentDidUpdate.call(this, prevProps);
        /**
         * setLatLngs works differently in polygons than rectangles. That causes problems on draw revert edited.
         * We do not need to update bounds here programmatically for now.
         * We commented it out. We may revisit later.
         */
        // const leafletElement: LeafletMultiPolygon = this.leafletElement as LeafletMultiPolygon;
        //
        // if (this.props.polygons !== prevProps.polygons) {
        //     leafletElement.setLatLngs(this.props.polygons as any)
        // }
    };
    return MultiPolygon;
}(path_1.Path));
exports.MultiPolygon = MultiPolygon;
