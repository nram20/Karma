import React from 'react'
import { ListView } from 'react-native'
import { Container, Content, Tabs, View, Header, Title } from 'native-base'
import { connect } from 'react-redux'
import JobCard from '../Components/JobCard'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'

import MapView from './MapView2'

// Styles
// import styles from './Styles/JobsScreenStyle'
// import AlertMessage from '../Components/AlertMessageComponent'

class JobsScreen extends React.Component {

  constructor (props) {
    super(props)

    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(this.props.jobs || {})
    }

    this._renderItem = this._renderItem.bind(this)
  }
  componentDidMount (){
    this.props.getJobs(this.props.currLocation.latitude, this.props.currLocation.longitude)
  }


  render () {
    return (
      <Container>
        <Header>
          <Title>Register</Title>
        </Header>
        <Content>
          <Tabs>
            <ListView
              tabLabel='List'
              removeClippedSubviews={false}
              dataSource={this.state.dataSource}
              renderRow={this._renderItem}
              enableEmptySections
            />
            <MapView tabLabel='Map' />
          </Tabs>
        </Content>
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
      <View>
        <JobCard
          handleClick={this.props.viewDetails}
          item={job}
        />
      </View>
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
    getJobs: (latitude, longitude) => {
      dispatch(Actions.localJobsRequest(latitude, longitude))
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen)
