// eslint-disable-next-line filenames/match-exported
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleDirections } from '../actions/app'

const id = 'directions'

function selector(state) {
  return state.getIn(['app', 'directions'])
}

function CheckboxDirections() {
  const dispatch = useDispatch()

  const onChange = React.useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleDirections({
          directions: checked,
        })
      )
    },
    [dispatch]
  )

  const value = useSelector(selector)

  return (
    <div className='custom-control custom-checkbox'>
      <input
        id={id}
        className='custom-control-input'
        type='checkbox'
        onChange={onChange}
        value={value}
      />

      <label className='custom-control-label' htmlFor={id}>
        Directions
      </label>
    </div>
  )
}

export default React.memo(CheckboxDirections)
