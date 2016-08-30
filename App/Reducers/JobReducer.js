import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  localJobs: [],
  postedJobs: {},
  appliedJobs: {}
})

const receiveJob = (state, action) => {
  return state.merge({
    localJobs: state.localJobs.concat(action.job),
    error: false
  })
}

const clearLocalJobs = (state, action) => 
  state.merge({
    localJobs: [],
    error: false
  })

const failure = (state, action) =>
  state.merge({
    error: true
  })

const postedDetailsSet = (state, action) =>
  state.merge({
    postedJobs: action.postedJobs,
    error: false
  })

const postedDetailsSetFailure = (state, action) =>
  state.merge({
    error: true
  })

const appliedDetailsSet = (state, action) =>
  state.merge({
    appliedJobs: action.appliedJobs,
    error: false
  })

const appliedDetailsSetFailure = (state, action) =>
  state.merge({
    error: true
  })

const appliedReceive = (state, action) =>
  state.merge({
    appliedJobs: action.appliedJobs
  })

const appliedFailure = (state, action) => state.merge({
  error: true
})

const selectJob = (state, action) => state.merge({
  selectedJob: action.job
})

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.JOB_RECEIVE]: receiveJob,
  [Types.JOBS_RECEIVE_FAILURE]: failure,
  [Types.APPLIED_JOBS_RECEIVE]: appliedReceive,
  [Types.APPLIED_JOBS_RECEIVE_FAILURE]: appliedFailure,
  [Types.POSTED_JOBS_DETAILS_SET]: postedDetailsSet,
  [Types.POSTED_JOBS_DETAILS_SET_FAILURE]: postedDetailsSetFailure,
  [Types.APPLIED_JOBS_DETAILS_SET]: appliedDetailsSet,
  [Types.APPLIED_JOBS_DETAILS_SET_FAILURE]: appliedDetailsSetFailure,
  [Types.SELECT_JOB_FOR_DETAILS]: selectJob,
  [Types.CLEAR_LOCAL_JOBS]: clearLocalJobs
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
