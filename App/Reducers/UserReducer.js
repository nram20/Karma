import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  userInfo: {}
})

const receiveUserInfo = (state, action) => {
  return state.merge({
    currUser: action.userInfo
  })
}

const ACTION_HANDLERS = {
  [Types.USER_INFO_RECEIVE]: receiveUserInfo
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
