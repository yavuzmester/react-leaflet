import {Path, PathProps} from './path';
import {LatLng} from "./types";

import {Polyline as LeafletPolyline} from 'leaflet';
import {omit} from "underscore";

type PolylineProps = PathProps & {bounds: LatLng[]} & any;

class Polyline extends Path {
    props: PolylineProps;
    leafletElement: LeafletPolyline | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletPolyline(
            this.props.latLngs,
            omit(this.props, "bounds")
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: PolylineProps) {
        super.componentDidUpdate(prevProps);

        const leafletElement: LeafletPolyline = this.leafletElement as LeafletPolyline;

        if (this.props.latLngs !== prevProps.latLngs) {
            leafletElement.setLatLngs(this.props.latLngs)
        }
    }
}

export {
    Polyline
};
