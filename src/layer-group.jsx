"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map_layer_1 = require("./map-layer");
var React = require("react");
var react_1 = require("react");
var leaflet_1 = require("leaflet");
var LayerGroup = (function (_super) {
    __extends(LayerGroup, _super);
    function LayerGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerGroup.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.LayerGroup();
    };
    LayerGroup.prototype.render = function () {
        return (<div style={{ display: 'none' }}>
                {this.props.children}
            </div>);
    };
    LayerGroup.prototype.getChildContext = function () {
        return {
            layerGroup: this.leafletElement
        };
    };
    return LayerGroup;
}(map_layer_1.MapLayer));
LayerGroup.propTypes = {
    children: react_1.PropTypes.oneOfType([
        react_1.PropTypes.arrayOf(react_1.PropTypes.node),
        react_1.PropTypes.node,
    ]).isRequired
};
LayerGroup.childContextTypes = {
    layerGroup: react_1.PropTypes.instanceOf(leaflet_1.LayerGroup)
};
exports.LayerGroup = LayerGroup;
