import {Path} from "./path";
import {LatLng} from "./types";

import {MultiPolygon as LeafletMultiPolygon} from 'leaflet';
import {omit} from "underscore";

interface MultiPolygonProps {
    polygons: LatLng[][]
}

class MultiPolygon extends Path {
    props: MultiPolygonProps;
    leafletElement: any | undefined;    //LeafletMultiPolygon | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletMultiPolygon(
            this.props.polygons as any,
            omit(this.props, "polygons")
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: MultiPolygonProps) {
        super.componentDidUpdate(prevProps);

        const leafletElement: LeafletMultiPolygon = this.leafletElement as LeafletMultiPolygon;

        if (this.props.polygons !== prevProps.polygons) {
            leafletElement.setLatLngs(this.props.polygons as any)
        }
    }
}

export {
    MultiPolygon
};