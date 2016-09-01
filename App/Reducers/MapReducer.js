import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  mapRegion: {}
})

const newMapRegion = (state, action) => state.merge({
  mapRegion: action.region
})

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.NEW_MAP_REGION]: newMapRegion
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
