import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'
import BottomNav from '../Components/BottomNav'
import { Colors } from '../Themes'
import { Container, Content, Icon } from 'native-base';

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


 var styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#e9b44c',
    borderRadius: 5
  },
  container: {
    borderColor: '#9b2915',
    borderWidth: 1,
    height: 60,
    backgroundColor: '#e9b44c'
  },
  title: {
    color: '#9b2915',
    fontWeight: 'bold'
  }

 })


class DashIcon extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Icon name='ios-person' style={{color: this.props.selected ? 'white' :'#9b2915'}}/>
          <Text style={{color: this.props.selected ? 'white' :'#9b2915', fontWeight: this.props.selected ? '800' : '600'}}>{this.props.title}</Text>
        </Content>
      </Container>
    )
  }
}

class PostIcon extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Icon name='ios-paper' style={{color: this.props.selected ? 'white' :'#9b2915'}}/>      
          <Text style={{color: this.props.selected ? 'white' :'#9b2915', fontWeight: this.props.selected ? '800' : '600'}}>{this.props.title}</Text>
        </Content>
      </Container>
    )
  }
}

class JobIcon extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Icon name='ios-globe' style={{color: this.props.selected ? 'white' :'#9b2915'}}/>      
          <Text style={{color: this.props.selected ? 'white' :'#9b2915', fontWeight: this.props.selected ? '800' : '600'}}>{this.props.title}</Text>
        </Content>
      </Container>          
    )
  }
}

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='root'>

          <Scene key='loginScreen' initial panHandlers={null} component={LoginScreen} hideBackImage title='Login' navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}}/>
          <Scene key='register' component={RegisterScreen} title='Register' navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}}/>    
          <Scene key='jobDetails' component={JobDetailsView} title='Job' navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'black'}} />
          <Scene tabs key='tabbar' type='reset' tabBarIconContainerStyle={styles.container} tabBarStyle={styles.tabbar} animated direction='vertical' duration={300} >
            <Scene key='dashboard' icon={DashIcon} component={DashboardScreen} title='Dashboard' panHandlers={null} navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}}>
            </Scene>
            <Scene key='post' icon={PostIcon} component={PostScreen} title='Post a Job!' panHandlers={null} navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}} >
            </Scene>
            <Scene key='jobs' icon={JobIcon} component={JobsScreen} title='Jobs' panHandlers={null} navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}} hideNavBar ></Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
