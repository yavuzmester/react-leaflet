import {Path, PathProps} from "./path";
import {LatLng} from "./types";

import {MultiPolyline as LeafletMultiPolyline} from 'leaflet';
import {omit} from "underscore";

type MultiPolygonProps = PathProps & {polylines: LatLng[][]} & any;

class MultiPolyline extends Path {
    props: MultiPolygonProps;
    leafletElement: any | undefined;    //LeafletMultiPolyline | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletMultiPolyline(
            this.props.polylines as any,
            Path.createLeafletOptions(omit(this.props, "polylines"))
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: MultiPolygonProps) {
        super.componentDidUpdate(prevProps);

        const leafletElement: LeafletMultiPolyline = this.leafletElement as LeafletMultiPolyline;

        if (this.props.polylines !== prevProps.polylines) {
            leafletElement.setLatLngs(this.props.polylines as any)
        }
    }
}

export {
    MultiPolyline
};
