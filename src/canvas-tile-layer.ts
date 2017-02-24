import {MapLayer} from "./map-layer";
import {Tile} from "./types";

import {TileLayer as LeafletTileLayer} from 'leaflet';

type LeafletCanvasTileLayerPatched = LeafletTileLayer.Canvas & {_tiles: any, _reset: Function, _update: Function};

import {forEach} from "underscore";

interface CanvasTileLayerProps {
    name: string,
    title: string,
    opacity: number,
    isOverlay?: boolean,
    checked?: boolean
}

abstract class CanvasTileLayer extends MapLayer {
    props: CanvasTileLayerProps;
    leafletElement: LeafletCanvasTileLayerPatched | undefined;

    static defaultProps = {
        noWrap: true
    };

    initLeafletElement() {
        this.leafletElement = new LeafletTileLayer.Canvas(this.props) as LeafletCanvasTileLayerPatched;
    }

    render() {
        return null;
    }

    abstract drawTile(canvas: HTMLCanvasElement, tile: Tile): void;

    componentDidMount() {
        super.componentDidMount();

        this._draw();
    }

    componentDidUpdate(prevProps: CanvasTileLayerProps) {
        const leafletElement: LeafletCanvasTileLayerPatched = this.leafletElement as LeafletCanvasTileLayerPatched;

        if (this.props.opacity !== prevProps.opacity) {
            leafletElement.setOpacity(this.props.opacity);
        }

        this._draw();
    }

    _draw() {
        const leafletElement: LeafletCanvasTileLayerPatched = this.leafletElement as LeafletCanvasTileLayerPatched;

        leafletElement._reset();
        leafletElement._update();

        forEach(leafletElement._tiles, canvas => {
            const tile: Tile = {
                ...canvas._tilePoint,
                zoom: this.context.map.getZoom()
            };

            this.drawTile(canvas, tile);

        });
    }
}

export {
    CanvasTileLayer
};
