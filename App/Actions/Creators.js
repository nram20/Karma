import Types from './Types'

const localJobsReceived = jobs =>
  ({ type: Types.JOBS_RECEIVE, jobs})

const localJobsReceivedFailure = failure =>
  ({ type: Types.JOBS_RECEIVE_FAILURE, failure })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

/**
 Makes available all the action creators we've created.
 */
export default {
  localJobsReceived,
  localJobsReceivedFailure,
  logout,
  startup,
}
