import {MapLayer} from './map-layer';
import {LatLng} from "./types";

import {ImageOverlay as LeafletImageOverlay} from 'leaflet';
import {omit} from "underscore";

interface ImageOverlayProps {
    bounds: LatLng[],
    url: string,
    attribution?: string,
    opacity?: number
}

class ImageOverlay extends MapLayer {
    props: ImageOverlayProps;
    leafletElement: LeafletImageOverlay | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletImageOverlay(
            this.props.url,
            this.props.bounds as any,
            omit(this.props, "url", "bounds")
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: ImageOverlayProps) {
        const leafletElement: LeafletImageOverlay = this.leafletElement as LeafletImageOverlay;

        if (this.props.url !== prevProps.url) {
            leafletElement.setUrl(this.props.url);
        }

        if (this.props.opacity !== prevProps.opacity) {
            leafletElement.setOpacity(this.props.opacity as any);
        }
    }
}

export {
    ImageOverlay
};
