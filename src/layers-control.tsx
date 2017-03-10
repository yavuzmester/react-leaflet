import {MapControl} from './map-control';

import * as React from 'react';

import {
    Control as LeafletControl,
    LayerGroup as LeafletLayerGroup,
    ILayer as LeafletILayer
} from "leaflet";

type LayersControlPatched = LeafletControl.Layers & {_layers: any, _update: () => void};

import {omit, forEach} from "underscore";

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

/**
 * when the layers are to be changed, unmount and remount the component via "key".
 */
class LayersControl extends MapControl {
    props: LayersControlProps;
    leafletElement: LayersControlPatched | undefined;

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

            memo[o.title] = dummyOverlay;

            return memo;
        }, {});

        this.leafletElement = new LeafletControl.Layers(
            baseLayers,
            overlays,
            {position: this.props.position}
        ) as LayersControlPatched;
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

    componentWillUnmount() {
        this.context.map.removeEventListener("baselayerchange", this.onBaseLayerChange);
        this.context.map.removeEventListener("overlayadd", this.onOverlayAdd);
        this.context.map.removeEventListener("overlayremove", this.onOverlayRemove);

        this._removeLayers();

        super.componentWillUnmount();
    }

    _removeLayers() {
        const layersControl: LayersControlPatched = this.leafletElement as LayersControlPatched;

        forEach(layersControl._layers, (l: any) => {
            this.context.map.removeLayer(l.layer);  //l.layer is insane here, but that is how Leaflet is!
        });
    }
}

export {
    LayersControl,
    LayersControlProps
};
