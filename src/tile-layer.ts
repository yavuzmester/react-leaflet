import {MapLayer} from "./map-layer";

import {TileLayer as LeafletTileLayer} from 'leaflet';

import {omit} from "underscore";

interface TileLayerProps {
    name: string,
    title: string,
    url: string,
    opacity?: number,
    isBaseLayer?: boolean,
    checked?: boolean
}

class TileLayer extends MapLayer {
    props: TileLayerProps;
    leafletElement: LeafletTileLayer;

    static defaultProps = {
        noWrap: true,
        opacity: 1
    };

    initLeafletElement() {
        this.leafletElement = new LeafletTileLayer(
            this.props.url,
            omit(this.props, "url")
        );
    }

    render() {
        return null;
    }

    componentDidUpdate(prevProps: TileLayerProps) {
        const leafletElement: LeafletTileLayer = this.leafletElement as LeafletTileLayer;

        if (this.props.url !== prevProps.url) {
            leafletElement.setUrl(this.props.url);
        }

        if (this.props.opacity !== prevProps.opacity) {
            leafletElement.setOpacity(this.props.opacity as any);
        }
    }
}

export {
    TileLayer
};
