/* globals google */
import * as React from "react"

import * as invariant from "invariant"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onCircleComplete: "circlecomplete",
  onMarkerComplete: "markercomplete",
  onOverlayComplete: "overlaycomplete",
  ondrawingManagerComplete: "drawingManagercomplete",
  onPolylineComplete: "polylinecomplete",
  onRectangleComplete: "rectanglecomplete"
}

const updaterMap = {
  drawingMode(
    instance: google.maps.drawing.DrawingManager,
    drawingMode: google.maps.drawing.OverlayType | null
  ) {
    instance.setDrawingMode(drawingMode)
  },
  options(
    instance: google.maps.drawing.DrawingManager,
    options: google.maps.drawing.DrawingManagerOptions
  ) {
    instance.setOptions(options)
  }
}

interface DrawingManagerState {
  drawingManager: google.maps.drawing.DrawingManager | null;
}

interface DrawingManagerProps {
  options?: google.maps.drawing.DrawingManagerOptions;
  drawingMode?: google.maps.drawing.OverlayType | null;
  onCircleComplete?: (circle: google.maps.Circle) => void;
  onMarkerComplete?: (marker: google.maps.Marker) => void;
  onOverlayComplete?: (e: google.maps.drawing.OverlayCompleteEvent) => void;
  onPolygonComplete?: (polygon: google.maps.Polygon) => void;
  onPolylineComplete?: (polyline: google.maps.Polyline) => void;
  onRectangleComplete?: (rectangle: google.maps.Rectangle) => void;
  onLoad?: (drawingManager: google.maps.drawing.DrawingManager) => void;
  onUnmount?: (drawingManager: google.maps.drawing.DrawingManager) => void;
}

export class DrawingManager extends React.PureComponent<
  DrawingManagerProps,
  DrawingManagerState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: DrawingManagerState = {
    drawingManager: null
  }

  constructor(props: DrawingManagerProps) {
    super(props)

    invariant(
      google.maps.drawing,
      'Did you include "libraries=drawing" in the URL?'
    )
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setDrawingManagerCallback = () => {
    if (this.state.drawingManager !== null) {
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: this.state.drawingManager
      })

      if (this.props.onLoad) {
        this.props.onLoad(this.state.drawingManager)
      }
    }
  }

  componentDidMount() {
    const drawingManager = new google.maps.drawing.DrawingManager({
      ...(this.props.options || {}),
      map: this.context
    })

    function setDrawingManager() {
      return {
        drawingManager
      }
    }

    this.setState(
      setDrawingManager,
      this.setDrawingManagerCallback
    )
  }

  componentDidUpdate(prevProps: DrawingManagerProps) {
    if (this.state.drawingManager !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.drawingManager
      })
    }
  }

  componentWillUnmount() {
    if (this.state.drawingManager !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.drawingManager)
      }

      unregisterEvents(this.registeredEvents)

      this.state.drawingManager.setMap(null)
    }
  }

  render() {
    return <></>
  }
}

export default DrawingManager
