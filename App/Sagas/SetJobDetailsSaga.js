import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db } from '../Config/FirebaseConfig'
// geoFire

export default () => {
  function * worker (postedJobs) {
    let postedJobIdArray = Object.keys(postedJobs)
    let postedPromiseArray = postedJobIdArray.map(el => {
      let ref = db.ref(`jobs/${el}`)
      return ref.once('value')
    })

    let postedObj = yield Promise.all(postedPromiseArray)
      .then(postedJobsArray => {
        return makePostedObj(postedJobIdArray, postedJobsArray)
      })

    function makePostedObj (ids, jobs) {
      let postedJobsObject = {}
      jobs.forEach((job, ind) => {
        let jobId = ids[ind]
        postedJobsObject[jobId] = job.val()
      })
      return postedJobsObject
    }

    yield put(Actions.postedDetailsSet(postedObj))
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.POSTED_JOBS_RECEIVE)
      const { postedJobs } = action
      yield call(worker, postedJobs)
    }
  }

  return {
    watcher,
    worker
  }
}
