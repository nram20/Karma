import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db, geoFire } from '../Config/FirebaseConfig.js'

export default () => {
  function * worker (latitude, longitude) {
    yield put(Actions.clearLocalJobs)

   let geoQuery = geoFire.query({
    center: [latitude, longitude],
    radius: 15
   })

   geoQuery.on("key_entered", (key, location, distance) => {
    let job = {key, location, distance}
    let ref = db.ref(`jobs/${key}`)
    ref.once(value, data => {
      job.poster = data.poster
      job.description = data.description
      job.title = data.title
      job.cost = data.cost
      console.log('recieveJob', Action.recieveJob);
      put(Actions.receiveJob(job))
    })
   })
  }

  function * watcher () {
    while (true) {
      console.log('local jobs', Types.LOCAL_JOBS_REQUEST);
      const action = yield take(Types.LOCAL_JOBS_REQUEST)

      const { latitude, longitude } = action
      console.log('lat long watcher', latitude, longitude);
      yield call(worker, latitude, longitude)
    }
  }

  return {
    watcher,
    worker
  }
}
