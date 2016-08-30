import React from 'react'
import { ListView } from 'react-native'
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
    postedJobs: state.jobs.postedJobs,
    appliedJobs: state.jobs.appliedJobs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewDetails: job => {
      dispatch(Actions.selectJob(job))
      NavigationActions.jobDetails()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
