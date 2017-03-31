import {Path, PathProps} from "./path";
import {LatLng} from "./types";

import {Polygon as LeafletPolygon} from 'leaflet';
import {omit} from "underscore";

type PolygonProps = PathProps & {bounds: LatLng[]} & any;

class Polygon extends Path {
    props: PolygonProps;
    leafletElement: LeafletPolygon | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletPolygon(
            this.props.bounds,
            Path.createLeafletOptions(omit(this.props, "bounds"))
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: PolygonProps) {
        super.componentDidUpdate(prevProps);

        const leafletElement: LeafletPolygon = this.leafletElement as LeafletPolygon;

        if (this.props.bounds !== prevProps.bounds) {
            leafletElement.setLatLngs(this.props.bounds)
        }
    }
}

export {
    Polygon
};
