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
        ])
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
            leafletElement.fitBounds(this.props.bounds as any);
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

        const currentLeafletMapBounds: [LatLng, LatLng, LatLng, LatLng] = [
            leafletMap.getBounds().getSouthWest(),
            leafletMap.getBounds().getSouthEast(),
            leafletMap.getBounds().getNorthEast(),
            leafletMap.getBounds().getNorthWest()
        ];

        if ((nextProps.maxBounds !== this.props.maxBounds) && !areLatLngBoundsClose(nextProps.maxBounds, this.props.maxBounds)) {
            leafletMap.setMaxBounds(nextProps.maxBounds);
        }

        if (nextProps.maxZoom !== this.props.maxZoom) {
            leafletMap.options.maxZoom = nextProps.maxZoom;
        }

        if (!isEqual(nextProps.style, this.props.style)) {
            Object.assign(
                findDOMNode<HTMLDivElement>(this).style,
                nextProps.style
            );
        }

        unbindEvents(leafletMap, leafletEvents);
        bindEvents(leafletMap, nextLeafletEvents);
        this._leafletEvents = nextLeafletEvents;
    }

    fitBoundsWithoutEvents(bounds: [LatLng, LatLng, LatLng, LatLng]) {
        const leafletMap: LeafletMap = this.leafletElement as LeafletMap,
            leafletEvents: Events = this._leafletEvents;

        unbindEvents(leafletMap, leafletEvents);

        leafletMap.fitBounds(bounds as any);

        bindEvents(leafletMap, leafletEvents);
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

function areLatLngBoundsClose(latLngBounds1: LatLng[], latLngBounds2: LatLng[]): boolean {
    if (latLngBounds1.length === latLngBounds2.length) {
        for (let i in latLngBounds1) {
            const diff: number = latLngDifference(latLngBounds1[i], latLngBounds2[i]);

            if (diff > 1) {
                return false;
            }
        }
    }

    return true;
}

function latLngDifference(latLng1: LatLng, latLng2: LatLng): number {
    return Math.sqrt(
        Math.pow(latLng1.lat - latLng2.lat, 2) +
        Math.pow(latLng1.lng - latLng2.lng, 2)
    );
}

export {
    Map
};
