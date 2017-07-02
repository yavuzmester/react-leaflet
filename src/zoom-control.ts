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

/**
 * You can define leaflet-zoom-control class in your css file, e.g.
.leaflet-zoom-control {
  width: 60px;
  height: 22px;
  text-align: center;
  font: bold 12px/20px Tahoma, Verdana, sans-serif;
  background-color: white;
  cursor: default;
}
 */

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
