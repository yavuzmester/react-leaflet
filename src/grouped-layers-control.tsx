import {LayersControl} from './layers-control';

import * as React from 'react';

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

import {omit, forEach} from "underscore";

interface GroupedLayersControlProps {
    position: "topleft" | "topright" | "bottomleft" | "bottomright",
    baseLayers: Array<{name: string, title: string}>,
    checkedBaseLayer: string,
    overlays: Array<{name: string, title: string, checked: boolean, groupTitle: string}>,
    onBaseLayerChange?: (name: string) => any,
    onOverlayAdd?: (name: string) => any,
    onOverlayRemove?: (name: string) => any
}

/**
 * when the layers are to be changed, unmount and remount the component via "key".
 */
class GroupedLayersControl extends LayersControl {
    props: GroupedLayersControlProps;
    leafletElement: (any & {_layers: any, _update: () => void}) | undefined;

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
            {position: this.props.position}
        );
    }
}

export {
    GroupedLayersControl
};
