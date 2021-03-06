import {take, call, put} from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db } from '../Config/FirebaseConfig.js'

export default () => {
  function * worker (action) {
    let workingJobs = action.workingJobs || {}
    let workingJobIdArray = Object.keys(workingJobs)

    let workingPromiseArray = workingJobIdArray.map(el => {
      let ref = db.ref(`jobs/${el}`)
      return ref.once('value', data => data)
    })

    let workingObj = yield Promise.all(workingPromiseArray)
      .then(workingJobsArray => {
        let newWorkingJobsArray = workingJobsArray.map(el => el.val())
        return makeWorkingObj(workingJobIdArray, newWorkingJobsArray)
      })

    function makeWorkingObj (ids, jobs) {
      let workingJobsObject = {}
      jobs.forEach((job, ind) => {
        let jobId = ids[ind]
        workingJobsObject[jobId] = job
      })
      return workingJobsObject
    }
    console.log('workingObj',workingObj)
    yield put(Actions.workingDetailsSet(workingObj))
  }

  function * watcher () {
    while (true) {
      yield* takeEvery(Types.WORKING_JOBS_RECEIVE, worker)
    }
  }

  return {
    watcher,
    worker
  }
}

