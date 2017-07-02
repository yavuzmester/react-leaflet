import {LayerGroup} from './layer-group';

import {
    FeatureGroup as LeafletFeatureGroup,
    ILayer as LeafletILayer
} from 'leaflet';

class FeatureGroup extends LayerGroup {
    leafletElement: LeafletFeatureGroup<LeafletILayer> | undefined;

    initLeafletElement() {
        this.leafletElement = new LeafletFeatureGroup<LeafletILayer>();
    }
}

export {
    FeatureGroup
};
