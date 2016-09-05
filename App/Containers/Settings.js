import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Button } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'
import firebase from 'firebase'


// Styles
import styles from './Styles/SettingsStyle'

class Settings extends React.Component {

  constructor (props) {
    super(props)
    this.logOut = this.logOut.bind(this)

  }
  logOut () {
    firebase.auth().signOut()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>Settings Container</Text>
        <Button onPress={this.logOut}>Log Out</Button>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
