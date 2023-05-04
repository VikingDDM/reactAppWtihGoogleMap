import * as React from "react"

import MapContext from "../../map-context"

interface BicyclingLayerState {
  bicyclingLayer: google.maps.BicyclingLayer | null;
}

interface BicyclingLayerProps {
  onLoad?: (bicyclingLayer: google.maps.BicyclingLayer) => void;
  onUnmount?: (bicyclingLayer: google.maps.BicyclingLayer) => void;
}

export class BicyclingLayer extends React.PureComponent<
  BicyclingLayerProps,
  BicyclingLayerState
> {
  public static defaultProps = {
    onLoad: () => {}
  }
  static contextType = MapContext

  state = {
    bicyclingLayer: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setBicyclingLayerCallback = () => {
    if (this.state.bicyclingLayer !== null) {
      // TODO: how is this possibly null if we're doing a null check
      // @ts-ignore
      this.state.bicyclingLayer.setMap(this.context)
      //@ts-ignore
      this.props.onLoad(this.state.bicyclingLayer)
    }
  }

  componentDidMount() {
    const bicyclingLayer = new google.maps.BicyclingLayer()

    function setBicyclingLayer() {
      return {
        bicyclingLayer
      }
    }

    this.setState(
      setBicyclingLayer,
      this.setBicyclingLayerCallback
    )
  }

  componentWillUnmount() {
    if (this.state.bicyclingLayer !== null) {
      if (this.props.onUnmount) {
        // @ts-ignore
        this.props.onUnmount(this.state.bicyclingLayer)
      }

      // @ts-ignore
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default BicyclingLayer
