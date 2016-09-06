import {take, call, put} from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db } from '../Config/FirebaseConfig'
// geoFire

export default () => {
  function * worker (action) {
    let selectedJob = action.job
    let applicantsRef = db.ref(`applicants/${selectedJob.key}`)
    let applicantsSnap = yield applicantsRef.once('value')
    let applicants = applicantsSnap.val() 
    let job = Object.assign({}, selectedJob, {applicants})
    yield put(Actions.selectJobDetailsSet(job))
  }

  function * watcher () {
    while (true) {
      yield* takeEvery(Types.SELECT_JOB_FOR_DETAILS, worker)
    }
  }

  return {
    watcher,
    worker
  }
}
