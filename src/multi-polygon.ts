import {Path, PathProps} from "./path";
import {LatLng} from "./types";

import {MultiPolygon as LeafletMultiPolygon} from 'leaflet';
import {omit} from "underscore";

type MultiPolygonProps = PathProps & {polygons: LatLng[][]} & any;

class MultiPolygon extends Path {
    props: MultiPolygonProps;
    leafletElement: any | undefined;    //LeafletMultiPolygon | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletMultiPolygon(
            this.props.polygons as any,
            Path.createLeafletOptions(omit(this.props, "polygons"))
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: MultiPolygonProps) {
        super.componentDidUpdate(prevProps);

        /**
         * setLatLngs works differently in polygons than rectangles. That causes problems on draw revert edited.
         * We do not need to update bounds here programmatically for now.
         * We commented it out. We may revisit later.
         */

        // const leafletElement: LeafletMultiPolygon = this.leafletElement as LeafletMultiPolygon;
        //
        // if (this.props.polygons !== prevProps.polygons) {
        //     leafletElement.setLatLngs(this.props.polygons as any)
        // }
    }
}

export {
    MultiPolygon
};
