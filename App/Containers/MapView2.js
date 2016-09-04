import React, { Component } from 'react'
import {
  MapView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Metrics from '../Themes/Metrics'
import { Actions as NavigationActions } from 'react-native-router-flux'

const calloutStyles = {
  content: {
    borderColor: 'black',
    width: 100
  },
  buttonView: {
    flex: 1
  }
}

// Detail callout for map pins
const DetailCallout = (props) => {
  console.log('detailCalloutProps', props)
  return (
    <View style={calloutStyles.content}>
      <View style={calloutStyles.buttonView}>
        <Button block onPress={() => props.viewDetails(props.job)} style={{ backgroundColor: '#384850', marginLeft: -10, marginRight: -10 }} >
          <Icon name='ios-search' style={{ color: '#00c497' }} />
        </Button>
      </View>
    </View>
  )
}

class MapView2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      mapRegionInput: undefined,
      jobs: this.props.jobs,
      showUserLocation: true
    }
    this.mapAnnotations = this.mapAnnotations.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        jobs: nextProps.jobs,
        annotations: this._getAnnotations(nextProps.jobs)
      })
    }
  }

  render () {
    return (
      <MapView
        style={styles.map}
        onRegionChange={this._onRegionChange}
        onRegionChangeComplete={this._onRegionChangeComplete}
        region={this.state.mapRegion}
        annotations={this.state.annotations}
      />
    )
  }

  mapAnnotations (jobs) {
    const annots = []
    jobs.forEach(job => {
      console.log('-------- job', job)
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
    annots.push(myLocation)
    return annots
  }

  _getAnnotations = (region) => {
    return this.mapAnnotations(this.state.jobs)
  }

  // console.log('region', region)
  // return [
  //   {
  //     longitude: region.longitude,
  //     latitude: region.latitude,
  //     title: 'You Are Here'
  //   },
  //   {
  //     longitude: -90,
  //     latitude: 40,
  //     title: ' ',
  //     tintColor: 'blue',
  //     onFocus: () => console.log('hey yo!'),
  //     // rightCalloutView: <View style={{height: 100, width: 100, backgroundColor: 'blue'}} />,
  //     // leftCalloutView: <View style={{height: 100, width: 100, backgroundColor: 'blue'}} />,
  //     detailCalloutView: <View style={{height: 100, width: 100, backgroundColor: 'blue', borderRadius: 5}} />
  //   }
  // ]

  _onRegionChange = (region) => {
    console.log('onRegionChange', this.props)
    this.setState({
      mapRegionInput: region
    })
  }

  _onRegionChangeComplete = (region) => {
    this.props.newMapRegion(region)
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false
      })
    }
  }

  // _onRegionInputChanged = (region) => {
  //   this.setState({
  //     mapRegion: region,
  //     mapRegionInput: region,
  //     annotations: this._getAnnotations(region)
  //   })
  // }
}

var styles = StyleSheet.create({
  map: {
    borderWidth: 1,
    borderColor: '#000000',
    height: Dimensions.get('window').height - Metrics.navBarHeight - 50 - 1,
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
