import {MapLayer} from "./map-layer";
import {Tile} from "./types";

import {TileLayer as LeafletTileLayer} from 'leaflet';
type LeafletCanvasTileLayerPatched = LeafletTileLayer.Canvas & {_tiles: any, _reset: Function, _update: Function};

import {forEach} from "underscore";

interface CanvasTileLayerProps {
    opacity?: number
}

function prepareCanvas(canvas: HTMLCanvasElement): void {
    const ctx: any = canvas.getContext("2d");

    //smooth rendering
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
}

abstract class CanvasTileLayer extends MapLayer {
    props: CanvasTileLayerProps;
    leafletElement: LeafletCanvasTileLayerPatched | undefined;

    static defaultProps = {
        noWrap: true,
        opacity: 1
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
            leafletElement.setOpacity(this.props.opacity as any);
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

            prepareCanvas(canvas);

            this.drawTile(canvas, tile);
        });
    }
}

export {
    CanvasTileLayer
};
