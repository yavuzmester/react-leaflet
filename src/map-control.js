"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var leaflet_1 = require("leaflet");
var MapControl = (function (_super) {
    __extends(MapControl, _super);
    function MapControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapControl.prototype.componentWillMount = function () {
        this.initLeafletElement();
    };
    MapControl.prototype.componentDidMount = function () {
        var leafletElement = this.leafletElement;
        this.context.map.addControl(leafletElement);
    };
    MapControl.prototype.componentDidUpdate = function (prevProps) {
        var leafletElement = this.leafletElement;
        //L.Control.Draw for example does not have setPosition method, thus the guard is adjusted accordingly.
        if (leafletElement.setPosition && (this.props.position !== prevProps.position)) {
            leafletElement.setPosition(this.props.position);
        }
    };
    MapControl.prototype.componentWillUnmount = function () {
        var leafletElement = this.leafletElement;
        this.context.map.removeControl(leafletElement);
        this.leafletElement = undefined;
    };
    return MapControl;
}(react_1.PureComponent));
MapControl.contextTypes = {
    map: react_1.PropTypes.instanceOf(leaflet_1.Map).isRequired
};
exports.MapControl = MapControl;
//# sourceMappingURL=map-control.js.map