import {MapControl} from './map-control';
import {MapLayer} from "./map-layer";

import * as React from 'react';
import {PropTypes, Children} from "react";

import {
    Map as LeafletMap,
    Control as LeafletControl
} from "leaflet";

import {omit} from "underscore";

interface LayersControlProps {
    position: "topleft" | "topright" | "bottomleft" | "bottomright"
}

interface LayersControlContext {
    map: LeafletMap
}

interface LayersControlChildContext {
    layersControl: LeafletControl.Layers | undefined
}

class LayersControl extends MapControl {
    props: LayersControlProps & {children?: any};
    context: LayersControlContext;
    leafletElement: LeafletControl.Layers | undefined;

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]).isRequired
    };

    static contextTypes = {
        map: PropTypes.instanceOf(LeafletMap).isRequired
    };

    static childContextTypes = {
        layersControl: PropTypes.instanceOf(LeafletControl.Layers)
    };

    initLeafletElement() {
        this.leafletElement = new LeafletControl.Layers(
            undefined,
            undefined,
            omit(this.props, "children")
        );
    }

    render() {
        const visibleChildren = this.leafletElement ?
            Children.map(this.props.children, child => {
                return (child && MapLayer.prototype.isChecked.call(child)) ? child : null;
            }) : null;

        return (
            <div style={{display: 'none'}}>
                {visibleChildren}
            </div>
        );
    }

    getChildContext(): LayersControlChildContext {
        return {
            layersControl: this.leafletElement
        };
    }
}

export {
    LayersControl
};
