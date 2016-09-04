import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db, geoFire } from '../Config/FirebaseConfig.js'

export default () => {
  function * worker (appliedJobs) {
    appliedJobs = appliedJobs || {}
    let appliedJobIdArray = Object.keys(appliedJobs)

    let appliedPromiseArray = appliedJobIdArray.map(el => {
      let ref = db.ref(`jobs/${el}`)
      return ref.once('value', data => data)
    })

    let appliedObj = yield Promise.all(appliedPromiseArray)
      .then(appliedJobsArray => {
        let newAppliedJobsArray = appliedJobsArray.map(el => el.val())
        return makeAppliedObj(appliedJobIdArray, newAppliedJobsArray)
      })

    function makeAppliedObj (ids, jobs) {
      let appliedJobsObject = {}
      jobs.forEach((job, ind) => {
        let jobId = ids[ind]
        appliedJobsObject[jobId] = job
      })
      return appliedJobsObject
    }
    yield put(Actions.appliedDetailsSet(appliedObj))
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.APPLIED_JOBS_RECEIVE)
      const { appliedJobs } = action
      yield call(worker, appliedJobs)
    }
  }

  return {
    watcher,
    worker
  }
}
