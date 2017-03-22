import {Path} from "./path";
import {LatLng} from "./types";

import {Rectangle as LeafletRectangle} from 'leaflet';
import {omit} from "underscore";

type RectangleBounds = {
    bounds: LatLng[]
} & any;

class Rectangle extends Path {
    props: RectangleBounds;
    leafletElement: LeafletRectangle | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletRectangle(
            this.props.bounds as any,
            omit(this.props, "bounds")
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: RectangleBounds) {
        super.componentDidUpdate(prevProps);

        const leafletElement: LeafletRectangle = this.leafletElement as LeafletRectangle;

        if (this.props.bounds !== prevProps.bounds) {
            leafletElement.setBounds(this.props.bounds as any);
        }
    }
}

export {
    Rectangle
};
