import {MapLayer} from './map-layer';
import {LatLng} from "./types";

import {
    Icon as LeafletIcon,
    Marker as LeafletMarker
} from 'leaflet';

import {omit} from "underscore";

interface MarkerProps {
    position: LatLng,
    icon?: LeafletIcon,
    text?: string,
    opacity?: number,
    draggable?: boolean,
    zIndexOffset?: number
}

class Marker extends MapLayer {
    props: MarkerProps;
    leafletElement: LeafletMarker | undefined;

    static defaultProps = {
        icon: new LeafletIcon({
            iconUrl: "https://asmaloney.com/wp-content/themes/asmaloney/maps_cluster/images/pin24.png",
            iconRetinaUrl: "https://asmaloney.com/wp-content/themes/asmaloney/maps_cluster/images/pin48.png",
            iconSize: [29, 24],
            iconAnchor: [9, 21],
            popupAnchor: [0, -14]
        })
    };

    initLeafletElement() {
        this.leafletElement = new LeafletMarker(
            this.props.position,
            omit(this.props, "position")
        );
    }

    render() {
        return null;
    }

    componentDidMount() {
        const leafletElement: LeafletMarker = this.leafletElement as LeafletMarker;

        if ("_icon" in leafletElement) {
            (leafletElement as any)._icon.innerHTML = this.props.text;
        }
    }

    componentDidUpdate(prevProps: MarkerProps) {
        const leafletElement: LeafletMarker = this.leafletElement as LeafletMarker;

        if (this.props.position !== prevProps.position) {
            leafletElement.setLatLng(this.props.position);
        }

        if (this.props.icon !== prevProps.icon) {
            leafletElement.setIcon(this.props.icon as any);
        }

        if ("_icon" in leafletElement && this.props.text !== prevProps.text) {
            (leafletElement as any)._icon.innerHTML = this.props.text;
        }

        if (this.props.opacity !== prevProps.opacity) {
            leafletElement.setOpacity(this.props.opacity as any);
        }

        if (this.props.draggable !== prevProps.draggable) {
            if (this.props.draggable) {
                leafletElement.dragging.enable();
            } else {
                leafletElement.dragging.disable();
            }
        }

        if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
            leafletElement.setZIndexOffset(this.props.zIndexOffset as any);
        }
    }
}

export {
    Marker
};
