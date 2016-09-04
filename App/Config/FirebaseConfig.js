import { Actions as NavigationActions } from 'react-native-router-flux'

//  a little funky, no?
import { dispatch } from '../../index.ios'

import firebase from 'firebase'
import GeoFire from 'geofire'
import Types from '../Actions/Types.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDj5NxoNUxS467y8dNfZyLw0sZOo32ufm8',
  authDomain: 'karmaninja-8a65c.firebaseapp.com',
  databaseURL: 'https://karmaninja-8a65c.firebaseio.com',
  storageBucket: 'karmaninja-8a65c.appspot.com'
}

firebase.initializeApp(firebaseConfig)

let db = firebase.database()

// Generate location firebase location
let firebaseRef = db.ref('locations')

// Create a new GeoFire instance at locations
let geoFire = new GeoFire(firebaseRef)

//  might want to move the login check to a loading screen so we don't
//  briefly show login screen before auth state is verified
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    NavigationActions.tabbar()
    // setLocalJobsListener()
    setPostedJobsListener(user)
    setAppliedJobsListener(user)
    setWorkingJobsListener(user)
  } else {
    NavigationActions.loginScreen()
  }
})

// function setLocalJobsListener () {
//   let jobsRef = db.ref('jobs')
//   jobsRef.on('value', snapshot => {
//     dispatch({type: Types.JOBS_RECEIVE, localJobs: snapshot.val()})
//   })
// }

function setPostedJobsListener (user) {
  let jobsRef = db.ref(`jobsPosted/${user.uid}`)
  jobsRef.on('value', snapshot => {
    if (snapshot.val()) {
      dispatch({type: Types.POSTED_JOBS_RECEIVE, postedJobs: snapshot.val()})
    }
  }) 
  db.ref(`jobsPosted`).on('child_removed', oldChildSnapshot => {
    if (user.uid === oldChildSnapshot.key) {
      if (oldChildSnapshot) {
        dispatch({type: Types.POSTED_JOBS_RECEIVE, postedJobs: {}})
      }
    }
  })
}

function setAppliedJobsListener (user) {
  let jobsRef = db.ref(`jobsAppliedFor/${user.uid}`)
  jobsRef.on('value', snapshot => {
    dispatch({type: Types.APPLIED_JOBS_RECEIVE, appliedJobs: snapshot.val()})
  })
}

function setWorkingJobsListener (user) {
  let jobsRef = db.ref(`working/${user.uid}`)
  jobsRef.on('value', snapshot => {
    dispatch({type: Types.WORKING_JOBS_RECEIVE, workingJobs: snapshot.val()})
  })
}

export {
  db,
  geoFire
}
