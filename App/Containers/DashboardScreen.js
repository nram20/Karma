import React from 'react'
import { ListView, View, Text } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/DashboardScreenStyle'

class DashboardScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      postedDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      // appliedDataSource: new ListView.DataSource({
      //   rowHasChanged: (row1, row2) => row1 !== row2
      // })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.postedDataSource}
          renderRow={this._renderItem.bind(this)}
        />
        {/* <ListView */}
        {/*   dataSource={this.state.appliedDataSource} */}
        {/*   renderRow={this._renderItem.bind(this)} */}
        {/* /> */}
      </View>
    )
  }

  _renderItem (item) {
    return (
      <View>
        <Text style={{color: 'white'}} >
          Title: {item.title}{'\n'}
          Description: {item.description}{'\n'}
          Location: {item.location}{'\n'}
          Cost: {item.cost}{'\n'}
          Poster: {item.poster}{'\n'}
          ---------
        </Text>
      </View>
    )
  }

  componentWillMount () {
    this.setState({
      postedDataSource: this.state.postedDataSource.cloneWithRows(this.props.postedJobs),
      // appliedDataSource: this.state.appliedDataSource.cloneWithRows(this.props.appliedJobs)
    })
  }
}

const mapStateToProps = (state) => {
  console.log('statey',state)
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
