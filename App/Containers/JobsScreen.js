import React from 'react'
import { ListView, View } from 'react-native'
import { connect } from 'react-redux'
import JobCard from '../Components/JobCard'

// Styles
import styles from './Styles/JobsScreenStyle'

class JobsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
        />
      </View>
    )
  }

  _renderItem (item) {
    return (
      <JobCard
        jobId={item.jobId}
        title={item.title}
        description={item.description}
        location={item.location}
        cost={item.cost}
        poster={item.poster}
      />
    )
  }
  // <View>
  //   <Text style={{color: 'white'}} >
  //     Title: {item.title}{'\n'}
  //     Description: {item.description}{'\n'}
  //     Location: {item.location}{'\n'}
  //     Cost: {item.cost}{'\n'}
  //     Poster: {item.poster}{'\n'}
  //     ---------
  //   </Text>
  // </View>

  formatJobData (jobsListObj) {
    // make deep copy
    let formattedObj = JSON.parse(JSON.stringify(jobsListObj))
    // add id
    for (let id in formattedObj) {
      formattedObj[id].jobId = id
    }
    return formattedObj
  }

  // const obj = {
  //   jobId: id,
  //   title: jobsListObj[id].title,
  //   description: jobsListObj[id].description,
  //   location: jobsListObj[id].location,
  //   cost: jobsListObj[id].cost,
  //   poster: jobsListObj[id].poster
  // }
  componentWillMount () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.formatJobData(this.props.jobs))
    })
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
