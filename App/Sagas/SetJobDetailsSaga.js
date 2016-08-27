import {take, call, put} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
import db from '../Config/FirebaseConfig.js'

export default () => {
  function * worker (postedJobs) {
    let postedJobIdArray = Object.keys(postedJobs)
    postedPromiseArray = postedJobIdArray.map(el => {
      let ref = db.ref(`jobs/${el}`)
      return ref.once('value', data => data)
    })

    let postedObj = yield Promise.all(postedPromiseArray)
      .then(postedJobsArray => {
        let newPostedJobsArray = postedJobsArray.map(el => el.val())
        return makePostedObj (postedJobIdArray, newPostedJobsArray)
      })

    function makePostedObj (ids, jobs) {
      let postedJobsObject = {}
      jobs.forEach((job, ind) => {
        let jobId = ids[ind]
        postedJobsObject[jobId] = job
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
