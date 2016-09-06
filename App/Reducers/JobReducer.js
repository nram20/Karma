import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  localJobs: [],
  postedJobs: {},
  workingJobs: {},
  selectedJob: {},
  appliedJobs: {}
})

const receiveJob = (state, action) =>
  state.merge({
    localJobs: state.localJobs.concat(action.job),
    error: false
  })

const removeJob = (state, action) => 
  state.merge({
    localJobs: state.localJobs.filter(job => job.key !== action.key),
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

const postedDetailsSet = (state, action) => {
  let updatedSelected
  for (let job in action.postedJobs) {
    if (state.selectedJob && state.selectedJob.key == job) {
      updatedSelected = action.postedJobs[job]
      updatedSelected.key = job
    }
  }
  return state.merge({
    postedJobs: action.postedJobs,
    selectedJob: updatedSelected || state.selectedJob
  })
}

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
  console.log('workingjobs',action)
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

const selectJobDetailsSet = (state, action) => {
  console.log('babb',action)
  return state.merge({
    selectedJob: action.job
  })
}

const applyToJob = (state, action) => {
  let appliedJobs = Object.assign({}, state.appliedJobs)
  appliedJobs[action.job.key] = action.job
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
  return state.merge({
    appliedJobs
  })
}

const hireWorker = (state, action) => {
  let updatedReturnJob = Object.assign({},state.postedJobs[action.jobKey], { hired: action.applicant })
  let updatedJobs = Object.assign({}, state.postedJobs, {[action.jobKey]: updatedReturnJob})
  let updatedSelected
  if (state.selectedJob && state.selectedJob.key == action.jobKey) {
    updatedSelected = Object.assign({}, state.selectedJob, { hired: action.applicant })
  }
  return state.merge({
    postedJobs: updatedJobs,
    selectedJob: updatedSelected || state.selectedJob
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
  [Types.SELECT_JOB_DETAILS_SET]: selectJobDetailsSet,
  [Types.APPLY_TO_JOB]: applyToJob,
  [Types.UNAPPLY_TO_JOB]: unapplyToJob,
  [Types.HIRE_WORKER]: hireWorker,
  [Types.CLEAR_LOCAL_JOBS]: clearLocalJobs,
  [Types.JOB_REMOVE]: removeJob
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
