import React, { Component } from 'react'
import firebase from 'firebase'
import { Text, StyleSheet } from 'react-native'
import { Scene, Router } from 'react-native-router-flux'
import { Container, Content, Icon } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'

// screens identified by the router
import RegisterScreen from '../Containers/RegisterScreen'
import JobDetailsView from '../Containers/JobDetailsView'
import LoginScreen from '../Containers/LoginScreen'
import JobsScreen from '../Containers/JobsScreen'
import DashboardScreen from '../Containers/DashboardScreen'
import PostScreen from '../Containers/PostScreen'
import Settings from '../Containers/Settings'

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
  render () {
    return (
      <Container>
        <Content>
          <Icon name='ios-person' style={{ color: this.props.selected ? 'white' : '#9b2915', marginLeft: 30, marginRight: 30, marginTop: 2 }} />
          <Text style={{ color: this.props.selected ? 'white' : '#9b2915', fontWeight: this.props.selected ? '800' : '600' }}>{this.props.title}</Text>
        </Content>
      </Container>
    )
  }
}

class PostIcon extends React.Component {
  render () {
    return (
      <Container>
        <Content>
          <Icon name='ios-paper' style={{ color: this.props.selected ? 'white' : '#9b2915', marginLeft: 30, marginRight: 30, marginTop: 2 }} />
          <Text style={{ color: this.props.selected ? 'white' : '#9b2915', fontWeight: this.props.selected ? '800' : '600' }}>{this.props.title}</Text>
        </Content>
      </Container>
    )
  }
}

class JobIcon extends React.Component {
  render () {
    return (
      <Container>
        <Content>
          <Icon name='ios-globe' style={{ color: this.props.selected ? 'white' : '#9b2915', marginLeft: 45, marginRight: 30, marginTop: 2 }} />
          <Text style={{color: this.props.selected ? 'white' : '#9b2915', fontWeight: this.props.selected ? '800' : '600', marginLeft: 25, marginRight: 25 }}>{this.props.title}</Text>
        </Content>
      </Container>
    )
  }
}

class NavigationRouter extends Component {

  constructor (props) {
    super(props)

    this.state = {
      currentKarma: props.currentKarma
    }
    this.getCurrentKarma = this.getCurrentKarma.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    NavigationActions.refresh()
  }

  getCurrentKarma() {
    return this.props.currentKarma
  }

  onRight() {
    console.log('righteous')
  }

  render () {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='loginScreen' initial panHandlers={null} component={LoginScreen} hideBackImage title='Login' navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}} />
          <Scene key='register' component={RegisterScreen} title='Register' navigationBarStyle={{ backgroundColor: '#e9b44c' }} titleStyle={{ color: '#9b2915', fontWeight: 'bold' }} />
          <Scene key='jobDetails' component={JobDetailsView} title='Job' navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}} />
          <Scene key='settings' component={Settings} titleStyle={{color: '#9b2915', fontWeight: 'bold'}} navigationBarStyle={{backgroundColor: '#e9b44c'}} title='Settings'/>
          <Scene tabs key='tabbar' type='reset' tabBarIconContainerStyle={styles.container} tabBarStyle={styles.tabbar} animated direction='vertical' duration={300} >
            <Scene key='dashboard'
              onRight={this.onRight}
              getRightTitle={this.getCurrentKarma}
              rightTitleStyle={{ color: '#9b2915', fontWeight: 'bold' }}
              leftButtonImage={require('../Themes/Images/gear.png')}
              leftButtonIconStyle={{width: 24, height:24}}
              onLeft={() => NavigationActions.settings()}
              icon={DashIcon}
              component={DashboardScreen}
              title='Dashboard'
              panHandlers={null}
              navigationBarStyle={{backgroundColor: '#e9b44c'}}
              titleStyle={{color: '#9b2915', fontWeight: 'bold'}}
            />
            <Scene key='post' icon={PostIcon} component={PostScreen} title='Post a Job!' panHandlers={null} navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}} />
            <Scene key='jobs' getRightTitle={this.getCurrentKarma} onRight={this.onRight} icon={JobIcon} component={JobsScreen} title='Jobs Near You' panHandlers={null} navigationBarStyle={{backgroundColor: '#e9b44c'}} titleStyle={{color: '#9b2915', fontWeight: 'bold'}} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentKarma: (state.user.currUser) ? state.user.currUser.currentKarma : 0
  }
}

export default connect(mapStateToProps)(NavigationRouter)
