import { combineReducers } from 'redux'
import jobs from './JobReducer'
import location from './LocationReducer'
import map from './MapReducer'
import user from './UserReducer'
import { db } from '../Config/FirebaseConfig'
// glue all the reducers together into 1 root reducer
const appReducer = combineReducers({
  jobs,
  location,
  user,
  map
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    removeListeners(state)
    state = undefined
  }
  return appReducer(state, action)
}

function removeListeners(state) {
  console.log('rootstate',state)
  let currUser = state.user.currUser.uid
  let refs = [
    `jobsPosted/${currUser}`,
    `jobsAppliedFor/${currUser}`,
    `jobsWorking/${currUser}`,
    `users/${currUser}`,
  ]
  refs.forEach(el => {
    db.ref(el).off()
  })
}







export default rootReducer







// Put reducer keys that you do NOT want stored to persistence here
// export const persistentStoreBlacklist = ['login']
// OR put reducer keys that you DO want stored to persistence here (overrides blacklist)
// export const persistentStoreWhitelist = []
