import {Path} from './path';

import {GeoJSON as LeafletGeoJsonLayer} from 'leaflet';
import {omit, isFunction} from 'underscore';

import FeatureCollection = GeoJSON.FeatureCollection;
import MultiPolygon = GeoJSON.MultiPolygon;
import Feature = GeoJSON.Feature;

interface GeoJSONProps {
    geojson: FeatureCollection<MultiPolygon>;
}

class GeoJSONLayer extends Path {
    props: GeoJSONProps;
    leafletElement: any | undefined;    //LeafletGeoJsonLayer | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletGeoJsonLayer(
            this.props.geojson,
            omit(this.props, "geojson")
        );
    }

    render() {
        return null;
    }
}

export {
    GeoJSONLayer
};
