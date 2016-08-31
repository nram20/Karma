import React, { Component, PropTypes } from 'react'
import {
  Image,
  MapView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'

class MapView2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      mapRegionInput: undefined,
      jobs: this.props.jobs,
      showUserLocation: true
    }
    console.log ('this.props:', this.props)
    this.mapAnnotations = this.mapAnnotations.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        jobs: nextProps.jobs
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
          showUserLocation={this.state.showUserLocation}
        />
      </View>
    )
  }

  mapAnnotations(jobs) {
    const annots = [];
    jobs.forEach(job => {
      const annot = {
        longitude: job.location[1],
        latitude: job.location[0],
        title: job.title,
      }
      annots.push(annot)
    })
    return annots;
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

  _onRegionInputChanged = (region) => {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region)
    })
  }
}

var styles = StyleSheet.create({
  map: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000'
  },
  container: {
    flex: 1,
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
  jobs: state.jobs.localJobs
})

const mapDispatchToProps = dispatch => ({
  newMapRegion: region => dispatch(Actions.newMapRegion(region))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapView2)
