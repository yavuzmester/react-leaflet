import {extractEvents, bindEvents, unbindEvents} from "./helpers";
import {LatLng, Events} from "./types";

import * as React from 'react';
import {PureComponent, PropTypes} from "react";
import {findDOMNode} from "react-dom";
import {Map as LeafletMap} from 'leaflet';
import {omit, isEqual} from 'underscore'

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
        const leafletMap: LeafletMap | undefined = this.leafletElement;

        return (
            <div style={this.props.style}>
                {leafletMap ? this.props.children : null}
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
        const leafletMap: LeafletMap = this.leafletElement as LeafletMap,
            leafletEvents: Events = this._leafletEvents,
            nextLeafletEvents: Events = extractEvents(nextProps);

        unbindEvents(leafletMap, leafletEvents);
        bindEvents(leafletMap, nextLeafletEvents);

        if (!isEqual(nextProps.bounds, this.props.bounds)) {
            const center: {lat: number, lng: number} = {
                lat: (
                    Math.min.apply(null, nextProps.bounds.map(b => b.lat)) +
                    Math.max.apply(null, nextProps.bounds.map(b => b.lat))
                ) / 2,

                lng: (
                    Math.min.apply(null, nextProps.bounds.map(b => b.lng)) +
                    Math.max.apply(null, nextProps.bounds.map(b => b.lng))
                ) / 2,
            };

            leafletMap.setView(center);
        }

        this._leafletEvents = nextLeafletEvents;
    }

    componentWillUnmount() {
        setTimeout(() => {
            const leafletMap: LeafletMap = this.leafletElement as LeafletMap;

            leafletMap.remove();

            this.leafletElement = undefined;
            this._leafletEvents = {};
        }, 0);
    }
}

export {
    Map
};
