import { fork } from 'redux-saga/effects'
import { watchStartup } from './StartupSaga'
import SetJobDetails from './SetJobDetailsSaga'
import SetAppliedJobDetails from './SetAppliedJobDetailsSaga'

// start the daemons
export default function * root () {
  yield fork(watchStartup)
  yield fork(SetJobDetails().watcher)
  yield fork(SetAppliedJobDetails().watcher)
}
