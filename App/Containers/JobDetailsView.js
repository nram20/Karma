import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import firebase from 'firebase'
import { db } from '../Config/FirebaseConfig'
// import Actions from '../Actions/Creators'
// import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/JobDetailsViewStyle'

class JobDetailsView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}

    this.applyToJob = this.applyToJob.bind(this)
    this.cancelJob = this.cancelJob.bind(this)
  }

  applyToJob () {
    let jobKey = this.props.job.id
    let currUser = firebase.auth().currentUser.uid
    let applicantsRef = db.ref(`applicants/${jobKey}/${currUser}`)
    applicantsRef.set(true)
    let appliedRef = db.ref(`jobsAppliedFor/${currUser}/${jobKey}`)
    appliedRef.set(true)
  }

  cancelJob () {
    let jobKey = this.props.job.id
    let currUser = firebase.auth().currentUser.uid
    db.ref(`jobsPosted/${currUser}/${jobKey}`).remove()
      .catch(console.log)
    let applicantsRef = db.ref(`applicants/${jobKey}`)
    applicantsRef.once('value', applicants => applicants)
      .then(applicants => {
        if (applicants.val()) {
          let applicantsArray = Object.keys(applicants.val())
          applicantsArray.forEach(applicant => {
            db.ref(`jobsAppliedFor/${applicant}/${jobKey}`).remove()
              .catch(console.log)
          })
        }
      })
      .then(() => {
        applicantsRef.remove()
      })
      .catch(console.log)
      .catch(console.log)
    db.ref(`jobs/${jobKey}`).remove()
    db.ref(`locations/${jobKey}`).remove()
  }

  render () {
    console.log(this.props.job)
    const {
      title,
      description,
      location,
      cost,
      poster,
      posterName,
      id
    } = this.props.job

    let currUser = firebase.auth().currentUser.uid

    // const controls = (<View>
    //   <Button onPress={this.cancelJob}>Cancel Job</Button><Button onPress={this.applyToJob}>Apply</Button>
    // </View>)
    const controls = (poster === currUser) ? <Button onPress={this.cancelJob}>Cancel Job</Button> : <Button onPress={this.applyToJob}>Apply</Button>

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>Where: {location}</Text>
        <Text style={styles.text}>Karma: {cost}</Text>
        <Text style={styles.text}>Poster : {poster}</Text>
        <Text style={styles.text}>Poster : {posterName}</Text>
        <Text style={styles.text}>Id: {id}</Text>
        {controls}
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
