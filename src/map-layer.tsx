import {PureComponent, PropTypes} from "react";

import {
    Map as LeafletMap,
    LayerGroup as LeafletLayerGroup,
    ILayer as LeafletILayer,
    Control as LeafletControl
} from "leaflet";

interface MapLayerProps {
    name?: string,
    title?: string,
    isBaseLayer?: boolean,
    isOverlay?: boolean,
    checked?: boolean
}

interface MapLayerContext {
    map: LeafletMap,
    layerGroup?: LeafletLayerGroup<LeafletILayer>,
    layersControl?: LeafletControl.Layers
}

abstract class MapLayer extends PureComponent<any, {}> {
    props: MapLayerProps;
    context: MapLayerContext;
    leafletElement: LeafletILayer | undefined;

    static contextTypes = {
        map: PropTypes.instanceOf(LeafletMap).isRequired,
        layerGroup: PropTypes.instanceOf(LeafletLayerGroup),
        layersControl: PropTypes.instanceOf(LeafletControl.Layers)
    };

    getName(): string | undefined {
        return this.props.name;
    }

    isChecked(): boolean {
        return !!this.props.checked;
    }

    abstract initLeafletElement(): void;

    componentWillMount() {
        this.initLeafletElement();
    }

    abstract render(): JSX.Element | null;

    componentDidMount() {
        this._addSelf();
    }

    componentWillUnmount() {
        this._removeSelf();
        this.leafletElement = undefined;
    }

    _addSelf() {
        const leafletElement: LeafletILayer = this.leafletElement as LeafletILayer;

        if (this.context.layersControl) {
            if (this.props.isBaseLayer) {
                this.context.layersControl.addBaseLayer(leafletElement, this.props.title || "");
            }
            else if (this.props.isOverlay) {
                this.context.layersControl.addOverlay(leafletElement, this.props.title || "");
            }
        }

        (this.context.layerGroup || this.context.map).addLayer(leafletElement);
    }

    _removeSelf() {
        const leafletElement: LeafletILayer = this.leafletElement as LeafletILayer;

        if (this.context.layersControl) {
            this.context.layersControl.removeLayer(leafletElement);
        }

        (this.context.layerGroup || this.context.map).removeLayer(leafletElement);
    }
}

export {
    MapLayer
};
