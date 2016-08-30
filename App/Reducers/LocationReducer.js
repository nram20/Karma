import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  currLocation: null,
  error: false,
  loading: false
})

const getLocation = (state, action) =>
  state.merge({
    loading: true,
    error: false,
    currLocation: action.location.coords
  })
const getLocationFail = (state, action) => {
  state.merge({
    currLocation: null,
    error: true,
    loading: true
  })
}

const ACTION_HANDLERS = {
  [Types.LOCATION_GET]: getLocation,
  [Types.LOCATION_GET_FAIL]: getLocationFail
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
