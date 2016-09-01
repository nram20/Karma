import React from 'react'
import { ListView, View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'native-base'
import firebase from 'firebase'
import { db } from '../Config/FirebaseConfig'
import Actions from '../Actions/Creators'
// import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/JobDetailsViewStyle'

class JobDetailsView extends React.Component {

  constructor (props) {
    super(props)

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      appliedDataSource: ds
    }

    this.applyToJob = this.applyToJob.bind(this)
    this.unapplyToJob = this.unapplyToJob.bind(this)
    this.cancelJob = this.cancelJob.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      appliedDataSource: this.state.appliedDataSource.cloneWithRows(nextProps.appliedJobs || {})
    })
  }

  logOut () {
    firebase.auth().signOut()
  }

  applyToJob () {
    let jobKey = this.props.job.id
    let currUser = firebase.auth().currentUser.uid
    let applicantsRef = db.ref(`applicants/${jobKey}/${currUser}`)
    applicantsRef.set(true)
    let appliedRef = db.ref(`jobsAppliedFor/${currUser}/${jobKey}`)
    appliedRef.set(true)
    this.props.actions.applyToJob(this.props.job)
  }

  unapplyToJob () {
    console.log('thispropsjob',this.props.job)
    let jobKey = this.props.job.id
    let currUser = firebase.auth().currentUser.uid
    let applicantsRef = db.ref(`applicants/${jobKey}/${currUser}`)
    applicantsRef.remove()
    let appliedRef = db.ref(`jobsAppliedFor/${currUser}/${jobKey}`)
    appliedRef.remove()
    this.props.actions.unapplyToJob(this.props.job)
  }

  cancelJob () {
    console.log('incancel',this.props.job)
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
    console.log('actttt',this.props.actions)
    const {
      title,
      description,
      location,
      cost,
      poster,
      posterName,
      key
    } = this.props.job

    let currUser = firebase.auth().currentUser.uid

    console.log('jobbbb', this.props.job)
    console.log('appllll', this.props.appliedJobs)

    let controls
    if (poster === currUser) {
      controls = (
        <View>
          <Button onPress={this.cancelJob}>Cancel Job</Button> 
          <ListView
            tabLabel="Jobs I've Posted"
            dataSource={this.state.appliedDataSource}
            removeClippedSubviews={false}
            renderRow={this._renderItem}
            enableEmptySections
          />
        </View>
      )
    } else if (this.props.appliedJobs && Object.keys(this.props.appliedJobs).includes(this.props.job.id)) {
      controls = <Button onPress={this.unapplyToJob}>unApply</Button>
    } else {
      controls = <Button onPress={this.applyToJob}>Apply</Button>
    }

    return (
      <View style={styles.container}>
        <ScrollView >
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
          <Text style={styles.text}>Where: {location}</Text>
          <Text style={styles.text}>Karma: {cost}</Text>
          <Text style={styles.text}>Poster : {poster}</Text>
          <Text style={styles.text}>Poster : {posterName}</Text>
          <Text style={styles.text}>Id: {key}</Text>
          {controls}
          <Button onPress={this.logOut}>Log the Fuck Out</Button>
        </ScrollView>
      </View>
    )
  }

  _renderItem (item, version, id) {
    const job = item ? Object.assign({}, item, { id }) : {}
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
    job: state.jobs.selectedJob,
    appliedJobs: state.jobs.appliedJobs
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('ac',Actions)
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsView)
