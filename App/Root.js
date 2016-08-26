import React, { PropTypes } from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Actions from './Actions/Creators'
import BottomNav from './Components/BottomNav'
import DebugSettings from './Config/DebugSettings'
import NavigationRouter from './Navigation/NavigationRouter'
import FullButton from './Components/FullButton'
import firebase from 'firebase'
// import './Config/PushConfig'

// Styles
import styles from './Containers/Styles/RootStyle'

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
    NavigationActions.splash()
  } else {
    NavigationActions.loginScreen()
  }
})

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  logout () {
    firebase.auth().signOut()
      .then(() => {
        console.log('signed out')
      })
      .catch(() => {
        console.log('couldn\'t sign out')
      })
  }

  componentWillMount () {
    const { dispatch } = this.props.store
    dispatch(Actions.startup())
  }

  renderApp () {
    console.disableYellowBox = !DebugSettings.yellowBox
    return (
      <Provider store={this.props.store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />
          <NavigationRouter />
          <BottomNav />
          <FullButton
            text='Logout (For Dev)'
            onPress={this.logout}
          />
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}

