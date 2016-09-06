import React from 'react'
import { ListView } from 'react-native'
import { Container, Content, Tabs, View, Header, Text } from 'native-base'
import { connect } from 'react-redux'
import JobCard from '../Components/JobCard'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'

import Metrics from '../Themes/Metrics'
import karmaTheme from '../NativeBase/karmaTheme'

import firebase from 'firebase'

import MapView from './MapView2'

// Styles
import styles from './Styles/JobsScreenStyle'
// import AlertMessage from '../Components/AlertMessageComponent'
const burntRed = '#9b2915'
const gold = '#e9b44c'
const cyan = '#50a2a7'

class JobsScreen extends React.Component {
  constructor (props) {
    super(props)

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds
    }

    this._renderItem = this._renderItem.bind(this)
  }

  componentDidMount () {
    let currUser = firebase.auth().currentUser.uid

    this.props.getJobs(this.props.currLocation.latitude, this.props.currLocation.longitude, currUser)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.jobs || {})
    })
  }

  render () {
    return (
      <Container style={{ paddingTop: 20, backgroundColor: cyan}}>

        <View theme={karmaTheme} style={{marginTop: 44}}>

          <Tabs style={styles.tabs}>
            <ListView
              tabLabel={'List'}
              removeClippedSubviews={false}
              dataSource={this.state.dataSource}
              renderRow={this._renderItem}
              enableEmptySections
            />
            <MapView tabLabel={'Map'} />
          </Tabs>
        </View>
      </Container>
    )
  }
  // <View style={styles.container}>
  //   <AlertMessage title='No Jobs in your area' show={this._noRowData()} />
  // </View>

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _renderItem (item, version, id) {
    const job = Object.assign({}, item, { id })
    return (
      
        <JobCard
          handleClick={this.props.viewDetails}
          item={job}
        />
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.localJobs,
    currLocation: state.location.currLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewDetails: job => {
      dispatch(Actions.selectJob(job))
      NavigationActions.jobDetails()
    },
    getJobs: (latitude, longitude, currUser) => {
      dispatch(Actions.localJobsRequest(latitude, longitude, currUser))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen)
