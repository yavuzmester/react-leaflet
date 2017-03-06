"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_control_1 = require("./map-control");
var map_layer_1 = require("./map-layer");
var React = require("react");
var react_1 = require("react");
var leaflet_1 = require("leaflet");
var underscore_1 = require("underscore");
var LayersControl = (function (_super) {
    __extends(LayersControl, _super);
    function LayersControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayersControl.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.Control.Layers(undefined, undefined, underscore_1.omit(this.props, "children"));
    };
    LayersControl.prototype.render = function () {
        var visibleChildren = this.leafletElement ?
            react_1.Children.map(this.props.children, function (child) {
                return (child && map_layer_1.MapLayer.prototype.isChecked.call(child)) ? child : null;
            }) : null;
        return (React.createElement("div", { style: { display: 'none' } }, visibleChildren));
    };
    LayersControl.prototype.getChildContext = function () {
        return {
            layersControl: this.leafletElement
        };
    };
    LayersControl.prototype.componentWillUnmount = function () {
        var _this = this;
        //below is needed, otherwise layerscontrol is unmounted before its children (strangely)
        setTimeout(function () {
            _super.prototype.componentWillUnmount.call(_this);
        }, 0);
    };
    return LayersControl;
}(map_control_1.MapControl));
LayersControl.propTypes = {
    children: react_1.PropTypes.oneOfType([
        react_1.PropTypes.arrayOf(react_1.PropTypes.node),
        react_1.PropTypes.node,
    ]).isRequired
};
LayersControl.childContextTypes = {
    layersControl: react_1.PropTypes.instanceOf(leaflet_1.Control.Layers)
};
exports.LayersControl = LayersControl;
