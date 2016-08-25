import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'
import RegisterScreen from '../Containers/RegisterScreen'

/* **************************
 * Documentation: https://github.com/aksonov/react-native-router-flux
 ***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>

        <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
          <Scene initial key='presentationScreen' component={PresentationScreen} title='Karma' />
          <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
          <Scene key='register' component={RegisterScreen} title='Register' />
          <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
          <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
          <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
          <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
          <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' />
        </Scene>

      </Router>
    )
  }
}

export default NavigationRouter
