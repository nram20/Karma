import React, { PropTypes } from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import Actions from './Actions/Creators'
import DebugSettings from './Config/DebugSettings'
import NavigationRouter from './Navigation/NavigationRouter'
import firebase from 'firebase'
// import './Config/PushConfig'

// Styles
import styles from './Containers/Styles/RootStyle'

const firebaseConfig = {
  apiKey: "AIzaSyDj5NxoNUxS467y8dNfZyLw0sZOo32ufm8",
  authDomain: "karmaninja-8a65c.firebaseapp.com",
  databaseURL: "https://karmaninja-8a65c.firebaseio.com",
  storageBucket: "karmaninja-8a65c.appspot.com",
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
})

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
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
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}

