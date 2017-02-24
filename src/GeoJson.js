import Path from './Path'

import {PropTypes} from 'react'
import {geoJson} from 'leaflet'
import {isFunction} from 'underscore'

export default class GeoJson extends Path {
    static propTypes = {
        data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    };

    componentWillMount() {
        super.componentWillMount()
        const {data, ...props} = this.props
        this.leafletElement = geoJson(data, props)
    }

    componentDidUpdate(prevProps: Object) {
        if (isFunction(this.props.style)) {
            this.setStyle(this.props.style)
        } else {
            this.setStyleIfChanged(prevProps, this.props)
        }
    }
}
