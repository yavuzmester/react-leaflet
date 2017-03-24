"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var layers_control_1 = require("./layers-control");
var L = require("leaflet");
var leaflet_1 = require("leaflet");
var LeafletGroupedLayerControl = require("leaflet-groupedlayercontrol");
//the hack is needed to require leaflet-groupedlayercontrol, if it is not used it is not required in the compiled jsx file.
(function () {
    var hack = LeafletGroupedLayerControl;
})();
//grouped layers control fix
L.Control.GroupedLayers.prototype._expand = function () {
    L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
    // permits to have a scrollbar if overlays heighter than the map.
    // var acceptableHeight = this._map._size.y - (this._container.offsetTop * 4);  //commented out
    var acceptableHeight = this._map._size.y - this._container.offsetTop; //injected in
    if (acceptableHeight < this._form.clientHeight) {
        L.DomUtil.addClass(this._form, 'leaflet-control-layers-scrollbar');
        this._form.style.height = acceptableHeight + 'px';
    }
};
/**
 * when the layers are to be changed, unmount and remount the component via "key".
 */
var GroupedLayersControl = (function (_super) {
    __extends(GroupedLayersControl, _super);
    function GroupedLayersControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupedLayersControl.prototype.initLeafletElement = function () {
        var _this = this;
        var baseLayers = this.props.baseLayers.reduce(function (memo, b) {
            var dummyBaseLayer = new leaflet_1.LayerGroup();
            if (b.name === _this.props.checkedBaseLayer) {
                _this.context.map.addLayer(dummyBaseLayer);
            }
            memo[b.title] = dummyBaseLayer;
            return memo;
        }, {});
        var overlays = this.props.overlays.reduce(function (memo, o) {
            var dummyOverlay = new leaflet_1.LayerGroup();
            if (o.checked) {
                _this.context.map.addLayer(dummyOverlay);
            }
            if (!(o.groupTitle in memo)) {
                memo[o.groupTitle] = {};
            }
            memo[o.groupTitle][o.title] = dummyOverlay;
            return memo;
        }, {});
        this.leafletElement = new leaflet_1.Control.GroupedLayers(baseLayers, overlays, {
            position: this.props.position,
            exclusiveGroups: this.props.exclusiveGroups
        });
    };
    return GroupedLayersControl;
}(layers_control_1.LayersControl));
GroupedLayersControl.defaultProps = {
    exclusiveGroups: []
};
exports.GroupedLayersControl = GroupedLayersControl;
