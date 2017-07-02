import {TileLayer} from "./tile-layer";

import {TileLayer as LeafletTileLayer} from "leaflet";
import {omit} from "underscore";

class WMSTileLayer extends TileLayer {
    initLeafletElement() {
        this.leafletElement = new LeafletTileLayer.WMS(
            this.props.url,
            omit(this.props, "url")
        );
    }
}

export {
    WMSTileLayer
};
