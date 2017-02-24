interface LatLng {
    lat: number,
    lng: number
}

interface Tile {
    x: number,
    y: number,
    zoom: number
}

type Events = {[key: string]: Function};

export {
    LatLng,
    Tile,
    Events
};
