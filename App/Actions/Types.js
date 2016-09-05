// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export default createTypes(`
  LOGIN_ATTEMPT
  LOGIN_SUCCESS
  LOGIN_FAILURE

  LOGOUT

  STARTUP

  USER_INFO_RECEIVE
  JOB_RECEIVE
  JOBS_RECEIVE_FAILURE
  POSTED_JOBS_RECEIVE_FAILURE
  POSTED_JOBS_RECEIVE
  POSTED_JOBS_DETAILS_SET
  POSTED_JOBS_DETAILS_SET_FAILURE
  APPLIED_JOBS_DETAILS_SET
  APPLIED_JOBS_DETAILS_SET_FAILURE
  APPLIED_JOBS_DETAILS_SET
  APPLIED_JOBS_DETAILS_SET_FAILURE
  APPLIED_JOBS_RECEIVE
  APPLIED_JOBS_RECEIVE_FAILURE
  WORKING_JOBS_DETAILS_SET
  WORKING_JOBS_DETAILS_SET_FAILURE
  WORKING_JOBS_RECEIVE
  WORKING_JOBS_RECEIVE_FAILURE
  
  APPLY_TO_JOB
  UNAPPLY_TO_JOB

  HIRE_WORKER

  SELECT_JOB_FOR_DETAILS


  LOCATION_GET
  LOCATION_GET_FAIL

  CLEAR_LOCAL_JOBS

  LOCAL_JOBS_REQUEST

  NEW_MAP_REGION
`)
