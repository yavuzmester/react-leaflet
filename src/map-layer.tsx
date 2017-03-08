import {PureComponent, PropTypes} from "react";

import {
    Map as LeafletMap,
    LayerGroup as LeafletLayerGroup,
    ILayer as LeafletILayer
} from "leaflet";

interface MapLayerContext {
    map: LeafletMap,
    layerGroup?: LeafletLayerGroup<LeafletILayer>
}

abstract class MapLayer extends PureComponent<any, {}> {
    props: any;
    context: MapLayerContext;
    leafletElement: LeafletILayer | undefined;

    static contextTypes = {
        map: PropTypes.instanceOf(LeafletMap).isRequired,
        layerGroup: PropTypes.instanceOf(LeafletLayerGroup)
    };

    abstract initLeafletElement(): void;

    componentWillMount() {
        this.initLeafletElement();
    }

    abstract render(): JSX.Element | null;

    componentDidMount() {
        const leafletElement: LeafletILayer = this.leafletElement as LeafletILayer;

        (this.context.layerGroup || this.context.map).addLayer(leafletElement);
    }

    componentWillUnmount() {
        const leafletElement: LeafletILayer = this.leafletElement as LeafletILayer;

        (this.context.layerGroup || this.context.map).removeLayer(leafletElement);

        this.leafletElement = undefined;
    }
}

export {
    MapLayer
};
