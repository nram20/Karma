import { take } from 'redux-saga/effects'
import Types from '../Actions/Types'

// process STARTUP actions
export function * watchStartup () {
  yield take(Types.STARTUP)
  // only fetch new temps when we don't have one yet
}
