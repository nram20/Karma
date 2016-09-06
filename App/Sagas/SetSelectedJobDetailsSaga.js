import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db } from '../Config/FirebaseConfig'
// geoFire

export default () => {
  function * worker (selectedJob) {
    let applicantsRef = db.ref(`applicants/${selectedJob.key}`)
    let applicantsSnap = yield applicantsRef.once('value')
    let applicants = applicantsSnap.val() 
    let job = Object.assign({}, selectedJob, {applicants})
    console.log('jobToReturn',job)
    yield put(Actions.selectJobDetailsSet(job))
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.SELECT_JOB_FOR_DETAILS)
      console.log('hey2')
      const { job } = action
      yield call(worker, job)
    }
  }

  return {
    watcher,
    worker
  }
}
