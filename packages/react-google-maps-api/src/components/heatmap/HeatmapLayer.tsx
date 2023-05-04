import * as React from "react"
import * as invariant from "invariant"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {}

const updaterMap = {
  data(
    instance: google.maps.visualization.HeatmapLayer,
    data: google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation> | google.maps.LatLng[] | google.maps.visualization.WeightedLocation[]
  ) {
    instance.setData(data)
  },
  map(instance: google.maps.visualization.HeatmapLayer, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(
    instance: google.maps.visualization.HeatmapLayer,
    options: google.maps.visualization.HeatmapLayerOptions
  ) {
    // TODO: add to official typings
    //@ts-ignore
    instance.setOptions(options)
  }
}

interface HeatmapLayerState {
  heatmapLayer: google.maps.visualization.HeatmapLayer | null;
}

interface HeatmapLayerProps {
  // required
  data: google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation> | google.maps.LatLng[] | google.maps.visualization.WeightedLocation[];
  options?: google.maps.visualization.HeatmapLayerOptions;
  onLoad?: (heatmapLayer: google.maps.visualization.HeatmapLayer) => void;
  onUnmount?: (heatmapLayer: google.maps.visualization.HeatmapLayer) => void;
}

export class HeatmapLayer extends React.PureComponent<
  HeatmapLayerProps,
  HeatmapLayerState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: HeatmapLayerState = {
    heatmapLayer: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setHeatmapLayerCallback = () => {
    if (this.state.heatmapLayer !== null) {
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: this.state.heatmapLayer
      })

      if (this.props.onLoad) {
        this.props.onLoad(this.state.heatmapLayer)
      }
    }
  }

  componentDidMount() {
    invariant(
      google.maps.visualization,
      'Did you include "visualization" in the libraries array prop in <LoadScript />?'
    )

    invariant(
      this.props.data,
      "data property is required in HeatmapLayer"
    )

    const heatmapLayer = new google.maps.visualization.HeatmapLayer({
      data: this.props.data,
      ...(this.props.options || {}),
      map: this.context
    })

    function setHeatmapLayer() {
      return {
        heatmapLayer
      }
    }

    this.setState(
      setHeatmapLayer,
      this.setHeatmapLayerCallback
    )
  }

  componentDidUpdate(prevProps: HeatmapLayerProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.heatmapLayer
    })
  }

  componentWillUnmount() {
    if (this.state.heatmapLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.heatmapLayer)
      }

      unregisterEvents(this.registeredEvents)

      this.state.heatmapLayer.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default HeatmapLayer
