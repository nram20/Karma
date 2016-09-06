import React, { Component } from 'react'
import {
  MapView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native'
import { Button, Icon, Container, Text } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Metrics from '../Themes/Metrics'
import Colors from '../Themes/Colors'

import { Actions as NavigationActions } from 'react-native-router-flux'

const mapStyles = StyleSheet.create({
  content: {
    borderColor: 'black',
    width: 100
  },
  buttonView: {
    flex: 1
  },
  homeButton: {
    height: 32,
    width: 32,
    backgroundColor: Colors.cyan,
    position: 'absolute',
    top: 10,
    right: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

// Detail callout for map pins
const DetailCallout = (props) => {
  return (
    <View style={mapStyles.content}>
      <View style={mapStyles.buttonView}>
        <Button block onPress={() => props.viewDetails(props.job)} style={{ backgroundColor: '#384850', marginLeft: -10, marginRight: -10 }} >
          <Icon name='ios-search' style={{ color: '#00c497' }} />
        </Button>
      </View>
    </View>
  )
}

// Button component to return to your location on the map
const MyLocationButton = props => {
  return (
    <Button style={mapStyles.homeButton} onPress={() => props.onPress()}>
      <Icon name="ios-home" style={{ color: '#eee' }}/>
    </Button>
  )
}

class MapView2 extends Component {
  constructor (props) {
    super(props)

    const { currLocation } = this.props

    this.initialRegion = {
      latitude: currLocation.latitude,
      longitude: currLocation.longitude,
      latitudeDelta: 2,
      longitudeDelta: 2
    }

    this.state = {
      isFirstLoad: true,
      mapRegion: this.initialRegion
    }
    this.mapAnnotations = this.mapAnnotations.bind(this)
    this.goToMyLocation = this.goToMyLocation.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('***map nextProps', nextProps)
    if (this.props !== nextProps) {
      this.setState({
        annotations: this.mapAnnotations(nextProps.jobs)
      })
    }
  }

  goToMyLocation() {
    let temp = Object.assign({}, this.initialRegion, {latitude: this.initialRegion.latitude + .00000000001})
    this.setState({ mapRegion: temp })
  }

  render () {
    return (
      <View>
        <MapView
          style={styles.map}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
          rotateEnabled={false}
          showsUserLocation={true}
        />
      <MyLocationButton onPress={this.goToMyLocation}/>
      </View>
    )
  }

  mapAnnotations (jobs) {
    console.log('jobs', jobs)
    const annots = []
    jobs.forEach(job => {
      console.log('***job***', job);
      const annot = {
        longitude: job.location[1],
        latitude: job.location[0],
        title: job.title,
        detailCalloutView: <DetailCallout job={job} viewDetails={this.props.viewDetails} />
      }
      annots.push(annot)
    })
    const { currLocation } = this.props
    const myLocation = {
      longitude: currLocation.longitude,
      latitude: currLocation.latitude,
      title: 'You Are Here',
      tintColor: 'blue'
    }
    // annots.push(myLocation)
    return annots
  }

  _getAnnotations = (region) => {
    return this.mapAnnotations(this.props.jobs)
  }

  _onRegionChangeComplete = (region) => {
    // this.setState({ mapRegion: region })
    // this.props.newMapRegion(region)
    if (this.state.isFirstLoad) {
      this.setState({
        annotations: this._getAnnotations(region),
        isFirstLoad: false
      })
    }
  }
}

var styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height - Metrics.navBarHeight - 50,
    width: Dimensions.get('window').width
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777'
  }
})

const mapStateToProps = state => ({
  jobs: state.jobs.localJobs,
  currLocation: state.location.currLocation
})

const mapDispatchToProps = dispatch => ({
  newMapRegion: region => dispatch(Actions.newMapRegion(region)),
  viewDetails: job => {
    dispatch(Actions.selectJob(job))
    NavigationActions.jobDetails()
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MapView2)
