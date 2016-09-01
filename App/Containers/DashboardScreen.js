import React from 'react'
import { ListView, Alertd } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import JobCard from '../Components/JobCard'
import { Container, Content, Tabs } from 'native-base'

// Styles

import AlertMessage from '../Components/AlertMessageComponent'

class DashboardScreen extends React.Component {

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})
    const ds2 = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      postedDataSource: ds.cloneWithRows(this.props.postedJobs || {}),
      appliedDataSource: ds2.cloneWithRows(this.props.appliedJobs || {})
    }

    this._renderItem = this._renderItem.bind(this)
  }

  watchID: ?number = null

  componentDidMount () {
    // console.log('mounted');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.getLocation(position)
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.props.getLocation(position)
    }, error => Alert.alert(error.message), {enableHighAccuracy: true, timeout: 200000, maximumAge: 20000})
  }
  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
  }
  render () {
    return (
      <Container>
        <Content>
          <AlertMessage title='No Jobs in your area' show={this._noRowData()} />
          <Tabs>
            <ListView
              tabLabel="Jobs I've Posted"
              dataSource={this.state.postedDataSource}
              removeClippedSubviews={false}
              renderRow={this._renderItem}
              enableEmptySections
            />
            <ListView
              tabLabel="Jobs I've Applied For"
              dataSource={this.state.appliedDataSource}
              removeClippedSubviews={false}
              renderRow={this._renderItem}
              enableEmptySections
            />
          </Tabs>
        </Content>
      </Container>
    )
  }

  _noRowData () {
    return this.state.postedDataSource.getRowCount() === 0
  }

  _renderItem (item, version, id) {

    console.log('---------')
    console.log(item)
    console.log(id)
    console.log('---------')
    const job = item ? Object.assign({}, item, { id }) : {}
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
    postedJobs: state.jobs.postedJobs,
    appliedJobs: state.jobs.appliedJobs,
    currLocation: state.location.currLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewDetails: job => {
      dispatch(Actions.selectJob(job))
      NavigationActions.jobDetails()
    },
    getLocation: location => {
      dispatch(Actions.getLocation(location))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
