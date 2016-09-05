import { combineReducers } from 'redux'
import jobs from './JobReducer'
import location from './LocationReducer'
import map from './MapReducer'
import user from './UserReducer'
// glue all the reducers together into 1 root reducer
export default combineReducers({
  jobs,
  location,
  user,
  map
})

// Put reducer keys that you do NOT want stored to persistence here
// export const persistentStoreBlacklist = ['login']
// OR put reducer keys that you DO want stored to persistence here (overrides blacklist)
// export const persistentStoreWhitelist = []
