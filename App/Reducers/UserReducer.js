import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  userInfo: {}
})

const receiveUserInfo = (state, action) => {
  console.log('action.userInfo',action.userInfo)
  let currUser = firebase.auth().currentUser.uid
  return state.merge({
    [currUser]: action.userInfo
  })
}

const ACTION_HANDLERS = {
  [Types.USER_INFO_RECEIVE]: receiveUserInfo
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
