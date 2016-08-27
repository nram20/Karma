import React, { Component } from 'react'
import { Scene, Router, NavBar } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import { View } from 'react-native'
import BottomNav from '../Components/BottomNav'


// screens identified by the router
import RegisterScreen from '../Containers/RegisterScreen'
import LoginScreen from '../Containers/LoginScreen'
import SplashScreen from '../Containers/SplashScreen'
import JobsScreen from '../Containers/JobsScreen'
import DashboardScreen from '../Containers/DashboardScreen'
import PostScreen from '../Containers/PostScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'

/* **************************
 * Documentation: https://github.com/aksonov/react-native-router-flux
 ***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
          {/* <NavBar key='navvy' > */}
          <NavBar key='navvy' navBar={BottomNav} >
            <Scene initial key='loginScreen' component={LoginScreen} title='Login' />
            <Scene key='register' component={RegisterScreen} title='Register' />
            <Scene key='splash' component={SplashScreen} title='Splash!' />
            <Scene key='dashboard' component={DashboardScreen} title='Dashboard' />
            <Scene key='post' component={PostScreen} title='Post a Job!' />
            <Scene key='jobs' component={JobsScreen} title='Jobs' />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
            <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
            <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' />
          </NavBar>
      </Router>
    )
  }
}

export default NavigationRouter
