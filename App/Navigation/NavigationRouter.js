import React, { Component } from 'react'
import { Text } from 'react-native'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'
import BottomNav from '../Components/BottomNav'

// screens identified by the router
import RegisterScreen from '../Containers/RegisterScreen'
import JobDetailsView from '../Containers/JobDetailsView'
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
import Testing from '../Containers/Testing'

/* **************************
 * Documentation: https://github.com/aksonov/react-native-router-flux
 ***************************/
 class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}


class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='loginScreen' initial panHandlers={null} component={LoginScreen} hideBackImage title='Login' />
          <Scene key='register' component={RegisterScreen} title='Register' />    
          <Scene key='jobDetails' component={JobDetailsView} title='Job' navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'black'}} />
          <Scene tabs key='tabbar' animated direction='vertical' duration={300}  type='reset'>
            <Scene key='dashboard' icon={TabIcon} component={DashboardScreen} title='Dashboard' panHandlers={null} navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'black'}}>
            </Scene>
            <Scene key='post' icon={TabIcon} component={PostScreen} title='Post a Job!' panHandlers={null} navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'black'}} >
            </Scene>
            <Scene key='jobs' icon={TabIcon} component={JobsScreen} title='Jobs' panHandlers={null} navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'black'}} hideNavBar ></Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
