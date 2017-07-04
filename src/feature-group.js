"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var layer_group_1 = require("./layer-group");
var leaflet_1 = require("leaflet");
var FeatureGroup = (function (_super) {
    __extends(FeatureGroup, _super);
    function FeatureGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FeatureGroup.prototype.initLeafletElement = function () {
        this.leafletElement = new leaflet_1.FeatureGroup();
    };
    return FeatureGroup;
}(layer_group_1.LayerGroup));
exports.FeatureGroup = FeatureGroup;
//# sourceMappingURL=feature-group.js.map