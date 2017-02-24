import {MapControl} from "./map-control";

import {
    Control as LeafletControl,
    DomUtil as LeafletDomUtil
} from "leaflet";

interface ZoomControlProps {
    position: "topleft" | "topright" | "bottomleft" | "bottomright",
    zoomInText?: string,
    zoomInTitle?: string,
    zoomOutText?: string,
    zoomOutTitle?: string
}

class ZoomControl extends MapControl {
    props: ZoomControlProps;
    leafletElement: LeafletControl.Zoom | undefined;

    constructor(props: ZoomControlProps, context: any) {
        super(props, context);
        this._updateMapZoom = this._updateMapZoom.bind(this);
    }

    initLeafletElement() {
        const leafletElement: LeafletControl.Zoom = new LeafletControl.Zoom(this.props);

        leafletElement.onAdd = function() {
            const container = LeafletDomUtil.create("div", "leaflet-zoom-control leaflet-bar-part leaflet-bar");

            (leafletElement as any)._container = container;

            return container;
        };

        this.leafletElement = leafletElement;
    }

    render() {
        return null;
    }

    componentDidMount() {
        super.componentDidMount();

        this._updateMapZoom();

        this.context.map.on("zoomend", this._updateMapZoom);
    }

    componentWillUnmount() {
        this.context.map.off("zoomend", this._updateMapZoom);
    }

    _updateMapZoom() {
        const leafletElement: LeafletControl.Zoom = this.leafletElement as LeafletControl.Zoom;
        (leafletElement as any)._container.innerHTML = "zoom:" + this.context.map.getZoom();
    }
}

export {
    ZoomControl
};
