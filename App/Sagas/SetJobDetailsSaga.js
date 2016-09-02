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
      return ref.once('value', data => data)
        .then(data => {
          let applicantRef = db.ref(`applicants/${el}`)
          return applicantRef.once('value', applicants => applicants)
            .then(applicants => {
              let jobData = data.val()
              if (applicants.val()) {
                jobData.applicants = Object.keys(applicants.val())
                console.log('jobapps', jobData.applicants)
              }
              return jobData
            })
        })
    })

    let postedObj = yield Promise.all(postedPromiseArray)
      .then(postedJobsArray => {
        return makePostedObj(postedJobIdArray, postedJobsArray)
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
