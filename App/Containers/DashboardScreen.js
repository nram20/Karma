import React from 'react'
import { ListView, Alert } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import JobCard from '../Components/JobCard'
import { Container, Content, Tabs } from 'native-base'
import karmaTheme from '../NativeBase/karmaTheme'

// Styles
import styles from './Styles/JobDetailsViewStyle'

import AlertMessage from '../Components/AlertMessageComponent'

class DashboardScreen extends React.Component {

  constructor (props) {
    super(props)

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    const ds2 = new ListView.DataSource({rowHasChanged})
    const ds3 = new ListView.DataSource({rowHasChanged})

    this.state = {
      postedDataSource: ds,
      appliedDataSource: ds2,
      workingDataSource: ds3
    }

    this._renderItem = this._renderItem.bind(this)
  }

  watchID: ?number = null

  componentWillReceiveProps (nextProps) {
    this.setState({
      postedDataSource: this.state.postedDataSource.cloneWithRows(nextProps.postedJobs || {}),
      appliedDataSource: this.state.appliedDataSource.cloneWithRows(nextProps.appliedJobs || {}),
      workingDataSource: this.state.workingDataSource.cloneWithRows(nextProps.workingJobs || {})
    })
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.getLocation(position)
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.props.getLocation(position)
    }, error => Alert.alert(error.message), {enableHighAccuracy: true, timeout: 200000, maximumAge: 20000})
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render () {
    return (
      <Container style={styles.container} theme={karmaTheme}>
        <Content>
          <AlertMessage title='No Jobs in your area' show={this._noRowData()} />
          <Tabs>

            <ListView
              tabLabel="I Posted"
              dataSource={this.state.postedDataSource}
              removeClippedSubviews={false}
              renderRow={this._renderItem}
              enableEmptySections
            />

            <ListView
              tabLabel="I Applied"
              dataSource={this.state.appliedDataSource}
              removeClippedSubviews={false}
              renderRow={this._renderItem}
              enableEmptySections
            />

            <ListView
              tabLabel="I'm Working"
              dataSource={this.state.workingDataSource}
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

  _renderItem (item, version, key) {
    const job = item ? Object.assign({}, item, { key }) : {}
    return (
      <JobCard
        handleClick={this.props.viewDetails}
        item={job}
      />
    )
  }
}

const mapStateToProps = (state) => {
  console.log('dashstate', state)
  return {
    postedJobs: state.jobs.postedJobs,
    appliedJobs: state.jobs.appliedJobs,
    workingJobs: state.jobs.workingJobs,
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
