import {MapControl} from './map-control';

import * as React from 'react';

import {
    Control as LeafletControl,
    LayerGroup as LeafletLayerGroup,
    ILayer as LeafletILayer
} from "leaflet";

import {omit} from "underscore";

import * as autobind from "autobind-decorator";

interface LayersControlProps {
    position: "topleft" | "topright" | "bottomleft" | "bottomright",
    baseLayers: Array<{name: string, title: string}>,
    checkedBaseLayer: string,
    overlays: Array<{name: string, title: string, checked: boolean}>,
    onBaseLayerChange?: (name: string) => any,
    onOverlayAdd?: (name: string) => any,
    onOverlayRemove?: (name: string) => any
}

class LayersControl extends MapControl {
    props: LayersControlProps;
    leafletElement: LeafletControl.Layers | undefined;
    _layers: LeafletILayer[] | undefined;

    componentWillMount() {
        this._layers = [];
        super.componentWillMount();
    }

    initLeafletElement() {
        const baseLayers: {[key: string]: LeafletLayerGroup<LeafletILayer>} = this.props.baseLayers.reduce((memo, b) => {
            const dummyBaseLayer: LeafletLayerGroup<LeafletILayer> = new LeafletLayerGroup();

            if (b.name === this.props.checkedBaseLayer) {
                this.context.map.addLayer(dummyBaseLayer);
                (this._layers as LeafletILayer[]).push(dummyBaseLayer);
            }

            memo[b.title] = dummyBaseLayer;

            return memo;
        }, {});

        const overlays: {[key: string]: LeafletLayerGroup<LeafletILayer>} = this.props.overlays.reduce((memo, o) => {
            const dummyOverlay: LeafletLayerGroup<LeafletILayer> = new LeafletLayerGroup();

            if (o.checked) {
                this.context.map.addLayer(dummyOverlay);
                (this._layers as LeafletILayer[]).push(dummyOverlay);
            }

            memo[o.title] = dummyOverlay;

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

        this.context.map.on("baselayerchange", this.onBaseLayerChange);
        this.context.map.on("overlayadd", this.onOverlayAdd);
        this.context.map.on("overlayremove", this.onOverlayRemove);
    }

    @autobind
    onBaseLayerChange(e: any) {
        if (this.props.onBaseLayerChange) {
            const baseLayerTitle: string = e.name,
                baseLayerName: string = this._getBaseLayerName(baseLayerTitle) as string;

            this.props.onBaseLayerChange(baseLayerName);
        }
    }

    @autobind
    onOverlayAdd(e: any) {
        if (this.props.onOverlayAdd) {
            const overlayTitle: string = e.name,
                overlayName: string = this._getOverlayName(overlayTitle) as string;

            this.props.onOverlayAdd(overlayName);
        }
    }

    @autobind
    onOverlayRemove(e: any) {
        if (this.props.onOverlayRemove) {
            const overlayTitle: string = e.name,
                overlayName: string = this._getOverlayName(overlayTitle) as string;

            this.props.onOverlayRemove(overlayName);
        }
    }

    _getBaseLayerName(title: string): string | undefined {
        return (this.props.baseLayers.find(b => b.title === title) || {name: undefined}).name;
    }

    _getOverlayName(title: string): string | undefined {
        return (this.props.overlays.find(b => b.title === title) || {name: undefined}).name;
    }

    componentDidUpdate() {
        this.componentWillUnmount();
        this.componentWillMount();
        this.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        (this._layers as LeafletILayer[]).forEach((layer: LeafletILayer) => this.context.map.removeLayer(layer));
        this._layers = [];

        this.context.map.removeEventListener("baselayerchange", this.onBaseLayerChange);
        this.context.map.removeEventListener("overlayadd", this.onOverlayAdd);
        this.context.map.removeEventListener("overlayremove", this.onOverlayRemove);
    }
}

export {
    LayersControl
};
