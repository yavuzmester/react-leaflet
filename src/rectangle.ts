import {Path, PathProps} from "./path";
import {LatLng} from "./types";

import {Rectangle as LeafletRectangle} from 'leaflet';
import {omit} from "underscore";

type RectangleProps = PathProps & {bounds: LatLng[]} & any;

class Rectangle extends Path {
    props: RectangleProps;
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

    componentDidUpdate(prevProps: RectangleProps) {
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
