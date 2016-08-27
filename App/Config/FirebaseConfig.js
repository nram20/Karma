import { Actions as NavigationActions } from 'react-native-router-flux'

//  a little funky, no?
import { dispatch } from '../../index.ios'

import firebase from 'firebase'
import Types from '../Actions/Types.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDj5NxoNUxS467y8dNfZyLw0sZOo32ufm8',
  authDomain: 'karmaninja-8a65c.firebaseapp.com',
  databaseURL: 'https://karmaninja-8a65c.firebaseio.com',
  storageBucket: 'karmaninja-8a65c.appspot.com'
}

firebase.initializeApp(firebaseConfig)

let db = firebase.database()
//  might want to move the login check to a loading screen so we don't
//  briefly show login screen before auth state is verified
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    NavigationActions.splash()
    let jobsRef = db.ref('jobs')
    jobsRef.on('value', snapshot => {
      dispatch({type: Types.JOBS_RECEIVE, localJobs: snapshot.val()})
    })
  } else {
    NavigationActions.loginScreen()
  }
})

export default db
