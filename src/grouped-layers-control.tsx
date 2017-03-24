import {LayersControl, LayersControlProps} from './layers-control';

import * as React from 'react';

import * as L from "leaflet";

import {
    Control as LeafletControl,
    LayerGroup as LeafletLayerGroup,
    ILayer as LeafletILayer
} from "leaflet";

import * as LeafletGroupedLayerControl from "leaflet-groupedlayercontrol";

//the hack is needed to require leaflet-groupedlayercontrol, if it is not used it is not required in the compiled jsx file.
(function() {
        var hack = LeafletGroupedLayerControl;}
)();

//grouped layers control fix
(L as any).Control.GroupedLayers.prototype._expand = function () {
    L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
    // permits to have a scrollbar if overlays heighter than the map.
    // var acceptableHeight = this._map._size.y - (this._container.offsetTop * 4);  //commented out
    var acceptableHeight = this._map._size.y - this._container.offsetTop;           //injected in
    if (acceptableHeight < this._form.clientHeight) {
        L.DomUtil.addClass(this._form, 'leaflet-control-layers-scrollbar');
        this._form.style.height = acceptableHeight + 'px';
    }
};

import {omit, forEach} from "underscore";

interface GroupedLayersControlProps extends LayersControlProps {
    overlays: Array<{name: string, title: string, checked: boolean, groupTitle: string}>,
    exclusiveGroups?: Array<string>
}

/**
 * when the layers are to be changed, unmount and remount the component via "key".
 */
class GroupedLayersControl extends LayersControl {
    props: GroupedLayersControlProps;
    leafletElement: (any & {_layers: any, _update: () => void}) | undefined;

    static defaultProps = {
        exclusiveGroups: []
    };

    initLeafletElement() {
        const baseLayers: {[key: string]: LeafletLayerGroup<LeafletILayer>} = this.props.baseLayers.reduce((memo, b) => {
            const dummyBaseLayer: LeafletLayerGroup<LeafletILayer> = new LeafletLayerGroup();

            if (b.name === this.props.checkedBaseLayer) {
                this.context.map.addLayer(dummyBaseLayer);
            }

            memo[b.title] = dummyBaseLayer;

            return memo;
        }, {});

        const overlays: {[key: string]: LeafletLayerGroup<LeafletILayer>} = this.props.overlays.reduce((memo, o) => {
            const dummyOverlay: LeafletLayerGroup<LeafletILayer> = new LeafletLayerGroup();

            if (o.checked) {
                this.context.map.addLayer(dummyOverlay);
            }

            if (!(o.groupTitle in memo)) {
                memo[o.groupTitle] = {};
            }

            memo[o.groupTitle][o.title] = dummyOverlay;

            return memo;
        }, {});

        this.leafletElement = new (LeafletControl as any).GroupedLayers(
            baseLayers,
            overlays,
            {
                position: this.props.position,
                exclusiveGroups: this.props.exclusiveGroups
            }
        );
    }
}

export {
    GroupedLayersControl,
    GroupedLayersControlProps
};
