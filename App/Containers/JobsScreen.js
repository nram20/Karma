import React from 'react'
import { ListView, View } from 'react-native'
import { connect } from 'react-redux'
import JobCard from '../Components/JobCard'

// Styles
import styles from './Styles/JobsScreenStyle'
import AlertMessage from '../Components/AlertMessageComponent'

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

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='No Jobs in your area' show={this._noRowData()} />
        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem} />
      </View>
    )
  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _renderItem (item, version, id) {
    return (
      <View>
        <JobCard
          item={item}
          id={id}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.localJobs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewDetails: jobId => {

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen)
