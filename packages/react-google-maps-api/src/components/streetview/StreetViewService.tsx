import { PureComponent } from "react"

// TODO: next line is broken import
import MapContext from "../../map-context"

export class StreetViewService extends PureComponent {
  static contextType = MapContext

  state = {
    streetViewService: null
  }

  componentDidMount = () => {
    const streetViewService = new google.maps.StreetViewService()

    this.setState(() => ({
      streetViewService
    }))
  }

  render = () => null

  getPanorama = () => this.state.streetViewService.getPanorama()
}

export default StreetViewService
