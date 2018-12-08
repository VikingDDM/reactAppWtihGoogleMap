// eslint-disable-next-line filenames/match-exported
import React, { Component } from 'react'
import Layout from '../components/layout'
import indexStyles from './index.module.css'
import uuid from 'uuidv4'

import {
  LoadScript
} from '../../../../src'

import ShapesExample from '../examples/shapes-example'
import DrawingManagerExample from '../examples/drawing-manager-example'
import BicyclingExample from '../examples/bicycling-example'
import TrafficExample from '../examples/traffic-example'
import GroundOverlayExample from '../examples/ground-overlay-example'
import HeatmapLayerExample from '../examples/heatmap-example'
import DirectionsRendererExample from '../examples/directions-renderer-example'
import FusionTablesLayerExample from '../examples/fusion-tables-layer-example'

const mapBoxStyle = {
  marginTop: '2rem',
  marginBottom: '3rem'
}

const mapHeaderStyle = {
  fontSize: '1.5rem',
  marginBottom: '1.5rem'
}

// const center = {
//   lat: -34.397,
//   lng: 150.644
// }

const loadingStyle = {
  height: `100%`,
  backgroundColor: '#023456'
}

const mapContainerStyle = {
  height: `400px`,
  width: `800px`
}

const shapeExampleStyles = {
  container: mapContainerStyle,
  mapContainer: indexStyles.mapContainer
}

const Loading = (
  <div style={loadingStyle} />
)

const googleMapsLibraries = [
  'drawing',
  'visualization'
]

const loaderId = uuid()

class IndexPage extends Component {
  state = {
    checked: true,
    googleMapsApiKey: ''
  }

  onChange = ({ target: { checked } }) => {
    this.setState(
      () => ({
        checked
      })
    )
  }

  onGoogleMapChange = ({ target: { value } }) => {
    this.setState(
      () => ({
        googleMapsApiKey: value
      })
    )
  }

  render = () => (
    <Layout>
      <h1>Hello People!</h1>

      <p>Welcome to React Google Maps Light Example.</p>

      <div>
        <label
          htmlFor='apikey'
        >
          Enter your Google API key here:
        </label>
        {` `}
        <input
          id='apikey'
          type='text'
          onChange={this.onGoogleMapChange}
          value={this.state.googleMapsApiKey}
        />
      </div>

      <div>
        <input
          id='toggle-script'
          type='checkbox'
          checked={this.state.checked}
          onChange={this.onChange}
        />
        {` `}
        <label htmlFor='toggle-script'>{`Toggle <LoadScript />`}</label>
      </div>

      {
        (
          this.state.checked &&
          this.state.googleMapsApiKey.length >= 38
        )
          ? (
            <LoadScript
              id={loaderId}
              googleMapsApiKey={this.state.googleMapsApiKey}
              language={'en'}
              region={'EN'}
              version={'weekly'}
              onLoad={() => console.log('script loaded')}
              loadingElement={Loading}
              libraries={googleMapsLibraries}
              preventGoogleFontsLoading
            >
              <div style={mapBoxStyle}>
                <h2 style={mapHeaderStyle}>
                  Fusion Tables Layer Google Map example
                </h2>

                <FusionTablesLayerExample
                  styles={shapeExampleStyles}
                />
              </div>

              <div style={mapBoxStyle}>
                <h2 style={mapHeaderStyle}>
                  Directions Renderer Google Map example
                </h2>

                <DirectionsRendererExample
                  styles={shapeExampleStyles}
                />
              </div>

              <div style={mapBoxStyle}>
                <h2 style={mapHeaderStyle}>
                  Heatmap Layer Google Map example
                </h2>

                <HeatmapLayerExample
                  styles={shapeExampleStyles}
                />
              </div>

              <div style={mapBoxStyle}>
                <h2 style={mapHeaderStyle}>
                  Traffic Layer Google Map example
                </h2>

                <TrafficExample
                  styles={shapeExampleStyles}
                />
              </div>

              <div style={mapBoxStyle}>
                <h2 style={mapHeaderStyle}>
                  Google Map with Shapes
                </h2>

                <ShapesExample
                  styles={shapeExampleStyles}
                />
              </div>

              <div style={mapBoxStyle}>
                <h2 style={mapHeaderStyle}>
                  Google Map with DrawingManager
                </h2>

                <DrawingManagerExample
                  styles={shapeExampleStyles}
                />
              </div>

              <div style={mapBoxStyle}>
                <h2 style={mapHeaderStyle}>
                  Google Map with Bicycling Layer
                </h2>

                <BicyclingExample
                  styles={shapeExampleStyles}
                />
              </div>

              <div style={mapBoxStyle}>
                <h2 style={mapHeaderStyle}>
                  Google Map with Ground Overlay
                </h2>

                <GroundOverlayExample
                  styles={shapeExampleStyles}
                />
              </div>
            </LoadScript>
          )
          : null
      }
    </Layout>
  )
}

export default IndexPage
