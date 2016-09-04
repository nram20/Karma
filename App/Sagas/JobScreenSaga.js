import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { db, geoFire } from '../Config/FirebaseConfig.js'
import { dispatch } from '../../index.ios'

export default () => {
  function * worker (latitude, longitude, currUser) {
    yield put(Actions.clearLocalJobs())

    let geoQuery = geoFire.query({
      center: [latitude, longitude],
      radius: 15
    })

    geoQuery.on('key_entered', (key, location, distance) => {
      let job = {key, location, distance}
      let ref = db.ref(`jobs/${key}`)
      ref.once('value', data => {
        data = data.val()
        job.poster = data.poster
        if (currUser !== data.poster) {
          job.description = data.description
          job.title = data.title
          job.cost = data.cost
          job.posterName = data.posterName

          dispatch(Actions.receiveJob(job))
        }
      })
    })
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.LOCAL_JOBS_REQUEST)

      const { latitude, longitude, currUser } = action
      yield call(worker, latitude, longitude, currUser)
    }
  }

  return {
    watcher,
    worker
  }
}
