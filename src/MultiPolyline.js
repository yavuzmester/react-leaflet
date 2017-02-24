import Path from './Path'
import latlngListType from './types/latlngList'

import {PropTypes} from 'react'
import {multiPolyline} from 'leaflet'

export default class MultiPolyline extends Path {
    static propTypes = {
        polylines: PropTypes.arrayOf(latlngListType).isRequired,
    };

    componentWillMount() {
        super.componentWillMount()
        const {polylines, ...props} = this.props
        this.leafletElement = multiPolyline(polylines, props)
    }

    componentDidUpdate(prevProps: Object) {
        if (this.props.polylines !== prevProps.polylines) {
            this.leafletElement.setLatLngs(this.props.polylines)
        }
        this.setStyleIfChanged(prevProps, this.props)
    }
}
