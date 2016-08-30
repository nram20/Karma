import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import firebase from 'firebase'
import db from '../Config/FirebaseConfig'
// import Actions from '../Actions/Creators'
// import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/JobDetailsViewStyle'

class JobDetailsView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}

    this.applyToJob = this.applyToJob.bind(this)
  }

  applyToJob () {
    let jobKey = this.props.job.id
    let currUser = firebase.auth().currentUser.uid
    let applicantsRef = db.ref(`applicants/${jobKey}/${currUser}`)
    applicantsRef.set(true)
    let appliedRef = db.ref(`jobsAppliedFor/${currUser}/${jobKey}`)
    appliedRef.set(true)
  }

  render () {
    const {
      title,
      description,
      location,
      cost,
      poster,
      id
    } = this.props.job
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>Where: {location}</Text>
        <Text style={styles.text}>Karma: {cost}</Text>
        <Text style={styles.text}>Poster : {poster}</Text>
        <Text style={styles.text}>Id: {id}</Text>
        <Button onPress={this.applyToJob}>Apply</Button>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.selectedJob
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsView)
