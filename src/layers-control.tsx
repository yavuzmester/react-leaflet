import {MapControl} from './map-control';

import * as React from 'react';

import {
    Map as LeafletMap,
    Control as LeafletControl,
    LayerGroup as LeafletLayerGroup
} from "leaflet";

import {omit} from "underscore";

interface LayersControlProps {
    position: "topleft" | "topright" | "bottomleft" | "bottomright",
    baseLayers: Array<{name: string, title: string}>,
    checkedBaseLayerName: string,
    overlays: Array<{name: string, title: string, checked: boolean}>
}

class LayersControl extends MapControl {
    props: LayersControlProps;
    leafletElement: LeafletControl.Layers | undefined;
    _baseLayers: any;
    _overlays: any;

    initLeafletElement() {
        const baseLayers = this.props.baseLayers.reduce((memo, b) => {
            memo[b.title] = new LeafletLayerGroup();
            return memo;
        }, {});

        const overlays = this.props.overlays.reduce((memo, o) => {
            memo[o.title] = new LeafletLayerGroup();
            return memo;
        }, {});

        this.leafletElement = new LeafletControl.Layers(
            baseLayers,
            overlays,
            {position: this.props.position}
        );
    }

    render() {
        return null;
    }

    componentDidUpdate() {
        super.componentWillUnmount();
        super.componentDidMount();
    }
}

export {
    LayersControl
};
