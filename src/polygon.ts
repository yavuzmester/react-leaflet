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
            this.props.bounds as any,
            Path.createLeafletOptions(omit(this.props, "bounds"))
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: PolygonProps) {
        super.componentDidUpdate(prevProps);

        /**
         * setLatLngs works differently in polygons than rectangles. That causes problems on draw revert edited.
         * We do not need to update bounds here programmatically for now.
         * We commented it out. We may revisit later.
         */

        // const leafletElement: LeafletPolygon = this.leafletElement as LeafletPolygon;
        //
        // if (this.props.bounds !== prevProps.bounds) {
        //     leafletElement.setLatLngs(this.props.bounds)
        // }
    }
}

export {
    Polygon
};
