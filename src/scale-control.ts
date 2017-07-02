import {MapControl} from "./map-control";

import {Control as LeafletControl} from "leaflet";

interface ScaleControlProps {
    position: "topleft" | "topright" | "bottomleft" | "bottomright",
    imperial?: boolean,
    maxWidth?: number,
    metric?: boolean,
    updateWhenIdle?: boolean
}

class ScaleControl extends MapControl {
    props: ScaleControlProps;
    leafletElement: LeafletControl.Scale | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletControl.Scale(this.props);
    }

    render() {
        return null;
    }
}

export {
    ScaleControl
};
