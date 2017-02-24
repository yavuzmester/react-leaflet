import {Path} from './path';
import {LatLng} from "./types";

import {CircleMarker as LeafletCircleMarker} from 'leaflet';
import {omit} from "underscore";

interface CircleMarkerProps {
    center: LatLng,
    radius?: number
}

class CircleMarker extends Path {
    props: CircleMarkerProps;
    leafletElement: LeafletCircleMarker | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletCircleMarker(
            this.props.center,
            omit(this.props, "center")
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: CircleMarkerProps) {
        super.componentDidUpdate(prevProps);

        const leafletElement: LeafletCircleMarker = this.leafletElement as LeafletCircleMarker;

        if (this.props.center !== prevProps.center) {
            leafletElement.setLatLng(this.props.center);
        }

        if (this.props.radius !== prevProps.radius) {
            leafletElement.setRadius(this.props.radius as any);
        }
    }
}

export {
    CircleMarker
};
