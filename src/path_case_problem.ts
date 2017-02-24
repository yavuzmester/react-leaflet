import {MapLayer} from './map-layer';

import {Path as LeafletPath} from "leaflet";
import {isEqual, pick} from 'underscore';

const STYLE_OPTION_NAMES = [
    'stroke',
    'color',
    'weight',
    'opacity',
    'fill',
    'fillColor',
    'fillOpacity',
    'fillRule',
    'dashArray',
    'lineCap',
    'lineJoin',
    'clickable',
    'pointerEvents',
    'className',
];

abstract class Path extends MapLayer {
    props: any;
    leafletElement: LeafletPath | undefined;

    componentDidUpdate(prevProps: any) {
        const leafletElement: LeafletPath = this.leafletElement as LeafletPath;

        if (typeof this.props.style !== "function") {
            const style: Object = pick(this.props, STYLE_OPTION_NAMES),
                prevStyle: Object = pick(prevProps, STYLE_OPTION_NAMES);

            if (!isEqual(style, prevStyle)) {
                leafletElement.setStyle(style);
            }
        }
        else {
            leafletElement.setStyle(this.props.style);
        }
    }
}

export {
    Path
};
