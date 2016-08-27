import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import db from '../Config/FirebaseConfig'
import firebase from 'firebase'

export const INITIAL_STATE = Immutable({
  localJobs: {},
  postedJobs: {},
  appliedJobs: {}
})

const receive = (state, action) =>
  state.merge({
    localJobs: action.localJobs
  })

const failure = (state, action) =>
  state.merge({
    error: true
  })

const postedDetailsSet = (state, action) =>
  state.merge({
    postedJobs: action.postedJobs
  })

const postedDetailsSetFailure = (state, action) =>
  state.merge({
    error: true
  })

const postedFailure = (state, action) =>
  state.merge({
    error: true
  })

const appliedReceive = (state, action) =>
  state
// state.merge({
//   appliedJobs: action.appliedJobs
// })

const appliedFailure = (state, action) =>
  state.merge({
    error: true
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.JOBS_RECEIVE]: receive,
  [Types.JOBS_RECEIVE_FAILURE]: failure,
  [Types.APPLIED_JOBS_RECEIVE]: appliedReceive,
  [Types.APPLIED_JOBS_RECEIVE_FAILURE]: appliedFailure,
  [Types.POSTED_JOBS_DETAILS_SET]: postedDetailsSet,
  [Types.POSTED_JOBS_DETAILS_SET_FAILURE]:  postedDetailsSetFailure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
