import {MapLayer} from './map-layer';

import * as React from "react";
import {PropTypes} from "react";

import {
    LayerGroup as LeafletLayerGroup,
    ILayer as LeafletILayer
} from "leaflet";

interface LayerGroupChildContext {
    layerGroup: LeafletLayerGroup<LeafletILayer> | undefined
}

class LayerGroup extends MapLayer {
    props: {children?: any};
    leafletElement: LeafletLayerGroup<LeafletILayer> | undefined;

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ])
    };

    static childContextTypes = {
        layerGroup: PropTypes.instanceOf(LeafletLayerGroup)
    };

    initLeafletElement() {
        this.leafletElement = new LeafletLayerGroup();
    }

    render() {
        return (
            <div style={{display: 'none'}}>
                {this.props.children}
            </div>
        );
    }

    getChildContext(): LayerGroupChildContext {
        return {
            layerGroup: this.leafletElement
        };
    }
}

export {
    LayerGroup
};
