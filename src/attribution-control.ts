import {MapControl} from "./map-control";

import {Control as LeafletControl} from "leaflet";

class AttributionControl extends MapControl {
    leafletElement: LeafletControl.Attribution | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletControl.Attribution(this.props);
    }

    render() {
        return null;
    }
}

export {
    AttributionControl
};
