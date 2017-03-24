import {PureComponent, PropTypes} from 'react';

import {
    Map as LeafletMap,
    Control as LeafletControl
} from 'leaflet';

interface MapControlProps {
    position: "topleft" | "topright" | "bottomleft" | "bottomright"
}

abstract class MapControl extends PureComponent<MapControlProps, {}> {
    props: MapControlProps;
    leafletElement: LeafletControl | undefined;

    static contextTypes = {
        map: PropTypes.instanceOf(LeafletMap).isRequired
    };

    abstract initLeafletElement(): void;

    componentWillMount() {
        this.initLeafletElement();
    }

    abstract render(): JSX.Element | null;

    componentDidMount() {
        const leafletElement: LeafletControl = this.leafletElement as LeafletControl;
        this.context.map.addControl(leafletElement);
    }

    componentDidUpdate(prevProps: MapControlProps) {
        const leafletElement: LeafletControl = this.leafletElement as LeafletControl;

        //L.Control.Draw for example does not have setPosition method, thus the guard is adjusted accordingly.
        if (leafletElement.setPosition && (this.props.position !== prevProps.position)) {
            leafletElement.setPosition(this.props.position as any);
        }
    }

    componentWillUnmount() {
        const leafletElement: LeafletControl = this.leafletElement as LeafletControl;

        this.context.map.removeControl(leafletElement);

        this.leafletElement = undefined;
    }
}

export {
    MapControl
};
