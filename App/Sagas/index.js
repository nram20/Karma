import { fork } from 'redux-saga/effects'
import { watchStartup } from './StartupSaga'

// start the daemons
export default function * root () {
  yield fork(watchStartup)
}
