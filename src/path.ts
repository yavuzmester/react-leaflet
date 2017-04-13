import {MapLayer} from './map-layer';

import {Path as LeafletPath} from "leaflet";
import {pick, isUndefined, isEqual} from 'underscore';
import PathOptions = L.PathOptions;

interface PathProps {
    //same names as leaflet
    fill?: boolean,
    fillColor?: string,
    fillOpacity?: number,
    fillRule?: string,
    stroke?: boolean,
    clickable?: boolean,
    pointerEvents?: string,
    className?: string,

    //different names than leaflet
    strokeColor?: string,      //'color' in leaflet, same as 'fillColor' by default
    strokeWeight?: number,     //'weight' in leaflet
    strokeOpacity?: number,    //'opacity' in leaflet
    strokeDashArray?: number,  //'dashArray' in leaflet
    strokeLineCap?: string,    //'lineCap' in leaflet
    strokeLineJoin?: string,   //'lineJoin' in leaflet

    style?: PathProps | Function,
    type?: string
}

function createLeafletOptions(pathOptions: PathProps | undefined): any {
    if (typeof pathOptions === "undefined") {
        return {};
    }
    else {
        const options: any = pick(
            pathOptions,
            "fill",
            "fillColor",
            "fillOpacity",
            "fillRule",
            "stroke",
            "clickable",
            "pointerEvents",
            "className",
            "type"
        );

        options.color = pathOptions.strokeColor || pathOptions.fillColor;

        if (!isUndefined(pathOptions.strokeWeight)) {
            options.weight = pathOptions.strokeWeight;
        }

        if (!isUndefined(pathOptions.strokeOpacity)) {
            options.opacity = pathOptions.strokeOpacity;
        }

        if (!isUndefined(pathOptions.strokeDashArray)) {
            options.dashArray = pathOptions.strokeDashArray;
        }

        if (!isUndefined(pathOptions.strokeLineCap)) {
            options.lineCap = pathOptions.strokeLineCap;
        }

        if (!isUndefined(pathOptions.strokeLineJoin)) {
            options.lineJoin = pathOptions.strokeLineJoin;
        }

        return options;
    }
}

abstract class Path extends MapLayer {
    props: PathProps;
    leafletElement: LeafletPath | undefined;

    static createLeafletOptions: (pathOptions: PathProps | undefined) => any = createLeafletOptions;

    componentDidMount() {
        super.componentDidMount();

        const leafletElement: LeafletPath = this.leafletElement as LeafletPath;

        if (typeof this.props.style !== "undefined") {
            if (typeof this.props.style === "function") {
                leafletElement.setStyle(this.props.style);
            }
            else {
                const style: Object = createLeafletOptions(this.props.style);
                leafletElement.setStyle(style);
            }
        }
    }

    componentDidUpdate(prevProps: any) {
        const leafletElement: LeafletPath = this.leafletElement as LeafletPath;

        if (typeof this.props.style === "function") {
            leafletElement.setStyle(this.props.style);
        }
        else {
            const style: Object = createLeafletOptions(this.props.style || this.props),
                prevStyle: Object = createLeafletOptions(prevProps.style || prevProps);

            if (!isEqual(style, prevStyle)) {
                leafletElement.setStyle(style);
            }
        }
    }
}

export {
    Path,
    PathProps
};
