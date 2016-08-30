import Types from './Types'

const localJobsReceived = jobs =>
  ({ type: Types.JOBS_RECEIVE, jobs })

const localJobsReceivedFailure = error =>
  ({ type: Types.JOBS_RECEIVE_FAILURE, error })

const postedDetailsSet = postedJobs =>
  ({ type: Types.POSTED_JOBS_DETAILS_SET, postedJobs })

const postedDetailsSetFailure = error =>
  ({ type: Types.POSTED_JOBS_DETAILS_SET_FAILURE, error })

const appliedDetailsSet = appliedJobs =>
  ({ type: Types.APPLIED_JOBS_DETAILS_SET, appliedJobs })

const appliedDetailsSetFailure = error =>
  ({ type: Types.APPLIED_JOBS_DETAILS_SET_FAILURE, error })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

const selectJob = (job) => ({
  job,
  type: Types.SELECT_JOB_FOR_DETAILS
})

const getLocation = (location) => ({
  location,
  type: Types.LOCATION_GET
})

const getLocationFail = () => ({
  type: Types.LOCATION_GET_FAIL
})

const clearLocalJobs = () => ({
  type: Types.CLEAR_LOCAL_JOBS
})

const recieveJob = (job) => ({
  type: Types.JOB_RECEIVE,
  job
})

const localJobsRequest = (latitude, longitude) => {
  return ({
  latitude,
  longitude,
  type: Types.LOCAL_JOBS_REQUEST
})}
/**
 Makes available all the action creators we've created.
 */
export default {
  localJobsReceived,
  localJobsReceivedFailure,
  postedDetailsSet,
  postedDetailsSetFailure,
  appliedDetailsSet,
  appliedDetailsSetFailure,
  logout,
  startup,
  selectJob,
  getLocation,
  getLocationFail,
  clearLocalJobs, 
  recieveJob,
  localJobsRequest
}
