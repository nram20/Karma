import { Actions as NavigationActions } from 'react-native-router-flux'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDj5NxoNUxS467y8dNfZyLw0sZOo32ufm8',
  authDomain: 'karmaninja-8a65c.firebaseapp.com',
  databaseURL: 'https://karmaninja-8a65c.firebaseio.com',
  storageBucket: 'karmaninja-8a65c.appspot.com'
}

firebase.initializeApp(firebaseConfig)

//  might want to move the login check to a loading screen so we don't
//  briefly show login screen before auth state is verified
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('hehehehehe')
    NavigationActions.splash()
  } else {
    NavigationActions.loginScreen()
  }
})

let db = firebase.database()

export default db
