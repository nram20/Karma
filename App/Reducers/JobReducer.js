import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  localJobs: [],
  postedJobs: {},
  appliedJobs: {}
})

const receiveJob = (state, action) =>
  state.merge({
    localJobs: state.localJobs.concat(action.job),
    error: false
  })


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

const appliedDetailsSet = (state, action) => {
  return state.merge({
    appliedJobs: action.appliedJobs,
    error: false
  })
}

const appliedDetailsSetFailure = (state, action) =>
  state.merge({
    error: true
  })

const workingDetailsSet = (state, action) => {
  return state.merge({
    workingJobs: action.workingJobs,
    error: false
  })
}

const workingDetailsSetFailure = (state, action) => {
  return state.merge({
    error: true
  })
}

const appliedFailure = (state, action) =>
  state.merge({
    error: true
  })

const selectJob = (state, action) =>
  state.merge({
    selectedJob: action.job
  })

const applyToJob = (state, action) => {
  console.log('applying')
  let appliedJobs = Object.assign({}, state.appliedJobs)
  appliedJobs[action.job.key] = action.job
  console.log('appliedjobsreducer', appliedJobs)
  return state.merge({
    appliedJobs
  })
}

const unapplyToJob = (state, action) => {
  let appliedJobs = {}
  if (state.jobs) {
    for (let job in state.jobs.appliedJobs) {
      if (job !== action.job) {
        appliedJobs[job] = state.jobs.appliedJobs[job]
      }
    }
  }
  console.log('unappliedjobsreducer',appliedJobs)
  return state.merge({
    appliedJobs
  })
}

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.JOB_RECEIVE]: receiveJob,
  [Types.JOBS_RECEIVE_FAILURE]: failure,
  [Types.APPLIED_JOBS_RECEIVE_FAILURE]: appliedFailure,
  [Types.POSTED_JOBS_DETAILS_SET]: postedDetailsSet,
  [Types.POSTED_JOBS_DETAILS_SET_FAILURE]: postedDetailsSetFailure,
  [Types.APPLIED_JOBS_DETAILS_SET]: appliedDetailsSet,
  [Types.APPLIED_JOBS_DETAILS_SET_FAILURE]: appliedDetailsSetFailure,
  [Types.WORKING_JOBS_DETAILS_SET]: workingDetailsSet,
  [Types.WORKING_JOBS_DETAILS_SET_FAILURE]: workingDetailsSetFailure,
  [Types.SELECT_JOB_FOR_DETAILS]: selectJob,
  [Types.APPLY_TO_JOB]: applyToJob,
  [Types.UNAPPLY_TO_JOB]: unapplyToJob,
  [Types.CLEAR_LOCAL_JOBS]: clearLocalJobs
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
