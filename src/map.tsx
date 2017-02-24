import {extractEvents, bindEvents, unbindEvents} from "./helpers";
import {LatLng, Events} from "./types";

import * as React from 'react';
import {PureComponent, PropTypes} from "react";
import {findDOMNode} from "react-dom";

import {Map as LeafletMap} from 'leaflet';

import {omit, uniqueId} from 'underscore'

interface MapProps extends LeafletMap.MapOptions {
    bounds: [LatLng, LatLng, LatLng, LatLng],
    maxBounds?: any,
    style: {
        width?: number,
        height: number,
        background?: string
    },
    onLoad?: (e: any) => void,
    onMoveend?: (e: any) => void
}

interface MapChildContext {
    map: LeafletMap | undefined
}

class Map extends PureComponent<MapProps, {}> {
    props: MapProps & {children?: any};
    leafletElement: LeafletMap | undefined;
    _leafletEvents: Events;

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]).isRequired
    };

    static childContextTypes = {
        map: PropTypes.instanceOf(LeafletMap)
    };

    render() {
        const map: LeafletMap | undefined = this.leafletElement;

        return (
            <div style={this.props.style}>
                {map ? this.props.children : null}
            </div>
        );
    }

    componentDidMount() {
        const domNode: Element = findDOMNode(this);

        const leafletElement: LeafletMap = new LeafletMap(
            domNode as any,
            {
                ...omit(this.props, 'children', 'onLoad', 'onMoveend'),
                attributionControl: false
            }
        );

        if (typeof this.props.bounds !== "undefined") {
            leafletElement.fitBounds(
                this.props.bounds as any
            );
        }

        const leafletEvents: Events = extractEvents(this.props);

        bindEvents(leafletElement, leafletEvents);

        this.leafletElement = leafletElement;
        this._leafletEvents = leafletEvents;

        this.forceUpdate();
    }

    getChildContext(): MapChildContext {
        return {
            map: this.leafletElement
        };
    }

    componentWillReceiveProps(nextProps: MapProps) {
        const map: LeafletMap = this.leafletElement as LeafletMap,
            leafletEvents: Events = this._leafletEvents,
            nextLeafletEvents: Events = extractEvents(nextProps);

        unbindEvents(map, leafletEvents);
        bindEvents(map, nextLeafletEvents);

        this._leafletEvents = nextLeafletEvents;
    }

    componentWillUnmount() {
        const map: LeafletMap = this.leafletElement as LeafletMap;

        map.remove();

        this.leafletElement = undefined;
        this._leafletEvents = {};
    }
}

export {
    Map
};
