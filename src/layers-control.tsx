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

    initLeafletElement() {
        const baseLayers: {[key: string]: LeafletLayerGroup<LeafletILayer>} = this.props.baseLayers.reduce((memo, b) => {
            const layerGroup: LeafletLayerGroup<LeafletILayer> = new LeafletLayerGroup();

            if (b.name === this.props.checkedBaseLayer) {
                layerGroup.addTo(this.context.map);
            }

            memo[b.title] = layerGroup;

            return memo;
        }, {});

        const overlays: {[key: string]: LeafletLayerGroup<LeafletILayer>} = this.props.overlays.reduce((memo, o) => {
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

        if (this.props.onBaseLayerChange) {
            this.context.map.on("baselayerchange", this.props.onBaseLayerChange);
        }

        if (this.props.onOverlayAdd) {
            this.context.map.on("overlayadd", this.props.onOverlayAdd);
        }

        if (this.props.onOverlayRemove) {
            this.context.map.on("overlayremove", this.props.onOverlayRemove);
        }
    }

    @autobind
    onBaseLayerChange(e: any) {
        const baseLayerTitle: string = e.name,
            baseLayerName: string = this._getBaseLayerName(baseLayerTitle) as string;

        if (this.props.onBaseLayerChange) {
            this.props.onBaseLayerChange(baseLayerName);
        }
    }

    @autobind
    onOverlayAdd(e: any) {
        const overlayTitle: string = e.name,
            overlayName: string = this._getOverlayName(overlayTitle) as string;

        if (this.props.onOverlayAdd) {
            this.props.onOverlayAdd(overlayName);
        }
    }

    @autobind
    onOverlayRemove(e: any) {
        const overlayTitle: string = e.name,
            overlayName: string = this._getOverlayName(overlayTitle) as string;

        if (this.props.onOverlayRemove) {
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
        super.componentWillUnmount();
        super.componentWillMount();
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        if (this.props.onBaseLayerChange) {
            this.context.map.removeEventListener("baselayerchange", this.props.onBaseLayerChange);
        }

        if (this.props.onOverlayAdd) {
            this.context.map.removeEventListener("overlayadd", this.props.onOverlayAdd);
        }

        if (this.props.onOverlayRemove) {
            this.context.map.removeEventListener("overlayremove", this.props.onOverlayRemove);
        }
    }
}

export {
    LayersControl
};
