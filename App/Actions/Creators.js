import Types from './Types'

const localJobsReceived = jobs =>
  ({ type: Types.JOBS_RECEIVE, jobs })

const localJobsReceivedFailure = error =>
  ({ type: Types.JOBS_RECEIVE_FAILURE, error })

const postedDetailsSet = postedJobs =>
  ({ type: Types.POSTED_JOBS_DETAILS_SET, postedJobs })

const postedDetailsSetFailure = error =>
  ({ type: Types.POSTED_JOBS_DETAILS_SET_FAILURE, error })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

/**
 Makes available all the action creators we've created.
 */
export default {
  localJobsReceived,
  localJobsReceivedFailure,
  postedDetailsSet,
  postedDetailsSetFailure,
  logout,
  startup
}
