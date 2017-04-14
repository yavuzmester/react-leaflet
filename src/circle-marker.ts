import {Path, PathProps} from './path';
import {LatLng} from "./types";

import {CircleMarker as LeafletCircleMarker} from 'leaflet';
import {omit} from "underscore";

type CircleMarkerProps = PathProps & {center: LatLng, radius?: number} & any;

class CircleMarker extends Path {
    props: CircleMarkerProps;
    leafletElement: LeafletCircleMarker | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletCircleMarker(
            this.props.center,
            Path.createLeafletOptions(omit(this.props, "bounds"))
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: CircleMarkerProps) {
        super.componentDidUpdate(prevProps);

        const leafletElement: LeafletCircleMarker = this.leafletElement as LeafletCircleMarker;

        if (JSON.stringify(this.props.center) !== JSON.stringify(prevProps.center)) {
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
