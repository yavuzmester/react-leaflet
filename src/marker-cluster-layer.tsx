import {MapLayer} from "./map-layer";

import * as LeafletMarkerCluster from "leaflet.markercluster";

import {
    Icon as LeafletIcon,
    Marker as LeafletMarker,
} from "leaflet";

interface MarkerClusterLayerProps {
    name: string,
    title: string,
    data: Array<{
        lat: number,
        lng: number
    } & any>,
    isOverlay?: boolean,
    checked?: boolean
}

const markerIcon: LeafletIcon = new LeafletIcon({
    iconUrl: "https://asmaloney.com/wp-content/themes/asmaloney/maps_cluster/images/pin24.png",
    iconRetinaUrl: "https://asmaloney.com/wp-content/themes/asmaloney/maps_cluster/images/pin48.png",
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14]
});

class MarkerClusterLayer extends MapLayer {
    props: MarkerClusterLayerProps;
    leafletElement: any | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletMarkerCluster();
    }

    render() {
        return null;
    }

    componentDidMount() {
        super.componentDidMount();

        const leafletElement: any = this.leafletElement as any;

        leafletElement.addLayers(
            this.props.data.map(d => this._datumToMarker(d))
        );
    }

    _datumToMarker(datum: {lat: number, lng: number} & any): LeafletMarker {
        const marker: LeafletMarker = new LeafletMarker(
            [datum.lat, datum.lng],
            {icon: markerIcon}
        );

        const popupHtml: string = this._datumToPopupHtml(datum);

        return marker.bindPopup(popupHtml);
    }

    _datumToPopupHtml(datum: {lat: number, lng: number} & any): string {
        return Object.keys(datum).reduce((memo, key) => {
            if (key !== "lat" && key !== "lng") {
                return memo + `<br/><b>${key}:</b>  ${datum[key]}`;
            }
            else {
                return memo;
            }
        }, "");
    }
}

export {
    MarkerClusterLayer
};
