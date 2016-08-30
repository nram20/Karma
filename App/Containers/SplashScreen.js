import React from 'react'
import { Text, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'

import { Button } from 'native-base'

// Styles
import styles from './Styles/PresentationScreenStyle'

class SplashScreen extends React.Component {

  watchID: ?number = null

  componentDidMount () {
    // console.log('mounted');
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position);
    //     this.setState({initialPosition});
    //   },
    //   (error) => alert(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.props.getLocation(position)
    }, error => Alert.alert(error.message), {enableHighAccuracy: true, timeout: 200000, maximumAge: 20000})
  }
  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>This is the first screen you see when you're logged in!</Text>
        <Button onPress={() => { console.log('hi test') }}> Click Me! </Button>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currLocation: state.location.currLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLocation: location => {
      dispatch(Actions.getLocation(location))
    },
    getJobs: (latitude, longitude) => {
      dispatch(Actions.localJobsRequest(latitude, longitude))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
