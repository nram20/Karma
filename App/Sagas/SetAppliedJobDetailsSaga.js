import {take, call, put} from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db } from '../Config/FirebaseConfig.js'

export default () => {
  function * worker (action) {
    let appliedJobs = action.appliedJobs || {}
    let appliedJobIdArray = Object.keys(appliedJobs)

    let appliedPromiseArray = appliedJobIdArray.map(el => {
      let ref = db.ref(`jobs/${el}`)
      return ref.once('value')
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
      yield* takeEvery(Types.APPLIED_JOBS_RECEIVE, worker)
    }
  }

  return {
    watcher,
    worker
  }
}
