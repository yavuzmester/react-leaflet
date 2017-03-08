import {MapControl} from './map-control';

import * as React from 'react';

import {
    Map as LeafletMap,
    Control as LeafletControl,
    LayerGroup as LeafletLayerGroup,
    ILayer as LeafletILayer
} from "leaflet";

import {omit} from "underscore";

interface LayersControlProps {
    position: "topleft" | "topright" | "bottomleft" | "bottomright",
    baseLayers: Array<{title: string}>,
    checkedBaseLayer: string,
    overlays: Array<{title: string, checked: boolean}>,
    onOverlayAdd?: (title: string) => any,
    onOverlayRemove?: (title: string) => any,
    onBaseLayerChange?: (title: string) => any
}

class LayersControl extends MapControl {
    props: LayersControlProps;
    leafletElement: LeafletControl.Layers | undefined;

    initLeafletElement() {
        const baseLayers = this.props.baseLayers.reduce((memo, b) => {
            const layerGroup: LeafletLayerGroup<LeafletILayer> = new LeafletLayerGroup();

            if (b.title === this.props.checkedBaseLayer) {
                layerGroup.addTo(this.context.map);
            }

            memo[b.title] = layerGroup;

            return memo;
        }, {});

        const overlays = this.props.overlays.reduce((memo, o) => {
            const layerGroup: LeafletLayerGroup<LeafletILayer> = new LeafletLayerGroup();

            if (o.checked) {
                layerGroup.addTo(this.context.map);
            }

            memo[o.title] = layerGroup;

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

    componentDidMount() {
        super.componentDidMount();

        if (this.props.onOverlayAdd) {
            this.context.map.on("overlayadd", this.props.onOverlayAdd);
        }

        if (this.props.onOverlayRemove) {
            this.context.map.on("overlayremove", this.props.onOverlayRemove);
        }

        if (this.props.onBaseLayerChange) {
            this.context.map.on("baselayerchange", this.props.onBaseLayerChange);
        }
    }

    componentDidUpdate() {
        super.componentWillUnmount();
        super.componentWillMount();
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        if (this.props.onOverlayAdd) {
            this.context.map.removeEventListener("overlayadd", this.props.onOverlayAdd);
        }

        if (this.props.onOverlayRemove) {
            this.context.map.removeEventListener("overlayremove", this.props.onOverlayRemove);
        }

        if (this.props.onBaseLayerChange) {
            this.context.map.removeEventListener("baselayerchange", this.props.onBaseLayerChange);
        }
    }
}

export {
    LayersControl
};
