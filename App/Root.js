import React, { PropTypes } from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import Actions from './Actions/Creators'
import DebugSettings from './Config/DebugSettings'
import NavigationRouter from './Navigation/NavigationRouter'
import FullButton from './Components/FullButton'
import './Config/FirebaseConfig'

// Styles
import styles from './Containers/Styles/RootStyle'

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
          <StatusBar />
          <NavigationRouter />
          {/* <FullButton */}
          {/*   text='Logout (For Dev)' */}
          {/*   onPress={this.logout} */}
          {/* /> */}
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}

