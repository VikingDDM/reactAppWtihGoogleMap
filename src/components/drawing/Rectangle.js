/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, RECTANGLE } from '../../constants'

import { RectanglePropTypes } from '../../proptypes'

const eventMap = {
  onBoundsChanged: 'bounds_changed',
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick',
}

const updaterMap = {
  bounds (instance, bounds) {
    instance.setBounds(bounds)
  },
  draggable (instance, draggable) {
    instance.setDraggable(draggable)
  },
  editable (instance, editable) {
    instance.setEditable(editable)
  },
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  visible (instance, visible) {
    instance.setVisible(visible)
  },
}

export class Rectangle extends PureComponent {
  static propTypes = RectanglePropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const rectangle = new google.maps.Rectangle(
      props.options
    )

    construct(
      RectanglePropTypes,
      updaterMap,
      props,
      rectangle
    )

    rectangle.setMap(context[MAP])

    this.state = {
      [RECTANGLE]: rectangle,
    }

    this.getBounds = this.getBounds.bind(this)
    this.getDraggable = this.getDraggable.bind(this)
    this.getEditable = this.getEditable.bind(this)
    this.getMap = this.getMap.bind(this)
    this.getVisible = this.getVisible.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[RECTANGLE], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[RECTANGLE], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const rectangle = this.state[RECTANGLE]

    if (rectangle) {
      rectangle.setMap(null)
    }
  }

  render () {
    return false
  }

  getBounds () {
    return this.state[RECTANGLE].getBounds()
  }

  getDraggable () {
    return this.state[RECTANGLE].getDraggable()
  }

  getEditable () {
    return this.state[RECTANGLE].getEditable()
  }

  getMap () {
    return this.state[RECTANGLE].getMap()
  }

  getVisible () {
    return this.state[RECTANGLE].getVisible()
  }
}

export default Rectangle
