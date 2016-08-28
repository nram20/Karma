import React from 'react'
import { ListView, View, Text } from 'react-native'
import { connect } from 'react-redux'

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
    jobs: state.jobs.localJobs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen)
