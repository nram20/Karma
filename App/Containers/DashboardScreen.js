import React from 'react'
import { ListView, View, Text } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/DashboardScreenStyle'
import AlertMessage from '../Components/AlertMessageComponent'

class DashboardScreen extends React.Component {

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      postedDataSource: ds.cloneWithRows(this.props.postedJobs || {})
    }

    this._renderItem = this._renderItem.bind(this)
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='No Jobs in your area' show={this._noRowData()} />
        <ListView dataSource={this.state.postedDataSource} renderRow={this._renderItem} />
        {/* <ListView */}
        {/*   dataSource={this.state.appliedDataSource} */}
        {/*   renderRow={this._renderItem.bind(this)} */}
        {/* /> */}
      </View>
    )
  }

  _noRowData () {
    return this.state.postedDataSource.getRowCount() === 0
  }

  _renderItem (item) {
    return (
      <View>
        <Text style={{color: 'white'}}>
          Title:
          {item.title}
          {'\n'} Description:
          {item.description}
          {'\n'} Location:
          {item.location}
          {'\n'} Cost:
          {item.cost}
          {'\n'} Poster:
          {item.poster}
          {'\n'} ---------
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postedJobs: state.jobs.postedJobs
  // appliedJobs: state.jobs.appliedJobs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
