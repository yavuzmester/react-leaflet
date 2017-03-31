import {Path, PathProps} from './path';
import {LatLng} from './types';

import {Circle as LeafletCircle} from 'leaflet';
import {omit} from "underscore";

type CircleProps = PathProps & {center: LatLng, radius: number} & any;

class Circle extends Path {
    props: CircleProps;
    leafletElement: LeafletCircle | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletCircle(
            this.props.center,
            this.props.radius,
            omit(this.props, "center", "radius")
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: CircleProps) {
        super.componentDidUpdate(prevProps);

        const leafletElement: LeafletCircle = this.leafletElement as LeafletCircle;

        if (this.props.center !== prevProps.center) {
            leafletElement.setLatLng(this.props.center)
        }

        if (this.props.radius !== prevProps.radius) {
            leafletElement.setRadius(this.props.radius)
        }
    }
}

export {
    Circle
};
