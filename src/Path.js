/* @flow */

import MapLayer from './MapLayer'

import {PropTypes} from 'react'
import {isEqual, pick} from 'underscore'

const OPTIONS = [
    'stroke',
    'color',
    'weight',
    'opacity',
    'fill',
    'fillColor',
    'fillOpacity',
    'fillRule',
    'dashArray',
    'lineCap',
    'lineJoin',
    'clickable',
    'pointerEvents',
    'className',
]

export default class Path extends MapLayer {
    getPathOptions(props: Object) {
        return pick(props, OPTIONS)
    }

    setStyle(options: Object = {}) {
        this.leafletElement.setStyle(options)
    }

    setStyleIfChanged(fromProps: Object, toProps: Object) {
        const nextStyle = this.getPathOptions(toProps)
        if (!isEqual(nextStyle, this.getPathOptions(fromProps))) {
            this.setStyle(nextStyle)
        }
    }
}
