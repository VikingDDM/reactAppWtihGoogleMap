/* global google */
import * as ReactDOM from 'react-dom'
import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'
import invariant from 'invariant'
import { ReactNode, PureComponent, ReactPortal, Children } from 'react'

const eventMap = {
  onCloseClick: 'closeclick',
  onContentChanged: 'content_changed',
  onDomReady: 'domready',
  onPositionChanged: 'position_changed',
  onZindexChanged: 'zindex_changed',
}

const updaterMap = {
  options(instance: google.maps.InfoWindow, options: google.maps.InfoWindowOptions): void {
    instance.setOptions(options)
  },
  position(
    instance: google.maps.InfoWindow,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ): void {
    instance.setPosition(position)
  },
  zIndex(instance: google.maps.InfoWindow, zIndex: number): void {
    instance.setZIndex(zIndex)
  },
}

interface InfoWindowState {
  infoWindow: google.maps.InfoWindow | null
}

export interface InfoWindowProps {
  children?: ReactNode | undefined
  /** Can be any MVCObject that exposes a LatLng position property and optionally a Point anchorPoint property for calculating the pixelOffset. The anchorPoint is the offset from the anchor's position to the tip of the InfoWindow. */
  anchor?: google.maps.MVCObject | undefined
  options?: google.maps.InfoWindowOptions | undefined
  /** The LatLng at which to display this InfoWindow. If the InfoWindow is opened with an anchor, the anchor's position will be used instead. */
  position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined
  /** All InfoWindows are displayed on the map in order of their zIndex, with higher values displaying in front of InfoWindows with lower values. By default, InfoWindows are displayed according to their latitude, with InfoWindows of lower latitudes appearing in front of InfoWindows at higher latitudes. InfoWindows are always displayed in front of markers. */
  zIndex?: number | undefined
  /** This event is fired when the close button was clicked. */
  onCloseClick?: (() => void) | undefined
  /** This event is fired when the <div> containing the InfoWindow's content is attached to the DOM. You may wish to monitor this event if you are building out your info window content dynamically. */
  onDomReady?: (() => void) | undefined
  /** This event is fired when the content property changes. */
  onContentChanged?: (() => void) | undefined
  /** This event is fired when the position property changes. */
  onPositionChanged?: (() => void) | undefined
  /** This event is fired when the InfoWindow's zIndex changes. */
  onZindexChanged?: (() => void) | undefined
  /** This callback is called when the infoWindow instance has loaded. It is called with the infoWindow instance. */
  onLoad?: ((infoWindow: google.maps.InfoWindow) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the infoWindow instance. */
  onUnmount?: ((infoWindow: google.maps.InfoWindow) => void) | undefined
}

export class InfoWindow extends PureComponent<InfoWindowProps, InfoWindowState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []
  containerElement: HTMLElement | null = null

  state: InfoWindowState = {
    infoWindow: null,
  }

  open = (infoWindow: google.maps.InfoWindow, anchor?: google.maps.MVCObject | undefined): void => {
    if (anchor) {
      // @ts-ignore
      infoWindow.open(this.context, anchor)
    } else if (infoWindow.getPosition()) {
      // @ts-ignore
      infoWindow.open(this.context)
    } else {
      invariant(
        false,
        `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`
      )
    }
  }

  setInfoWindowCallback = (): void => {
    if (this.state.infoWindow !== null && this.containerElement !== null) {
      this.state.infoWindow.setContent(this.containerElement)

      this.open(this.state.infoWindow, this.props.anchor)

      if (this.props.onLoad) {
        this.props.onLoad(this.state.infoWindow)
      }
    }
  }

  componentDidMount(): void {
    const infoWindow = new google.maps.InfoWindow({
      ...(this.props.options || {}),
    })

    this.containerElement = document.createElement('div')

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: infoWindow,
    })

    this.setState(() => {
      return {
        infoWindow,
      }
    }, this.setInfoWindowCallback)
  }

  componentDidUpdate(prevProps: InfoWindowProps): void {
    if (this.state.infoWindow !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.infoWindow,
      })
    }
  }

  componentWillUnmount(): void {
    if (this.state.infoWindow !== null) {
      unregisterEvents(this.registeredEvents)

      this.state.infoWindow.close()
    }
  }

  render(): ReactPortal | null {
    return this.containerElement ? (
      ReactDOM.createPortal(Children.only(this.props.children), this.containerElement)
    ) : (
      null
    )
  }
}

export default InfoWindow
