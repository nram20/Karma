import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  localJobs: null
})

// receive temp
const receive = (state, action) =>
  state.merge({
    localJobs: action.localJobs
  })

// temp failure
const failure = (state, action) =>
  state.merge({
    error: true
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.JOBS_RECEIVE]: receive,
  [Types.JOBS_RECEIVE_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
