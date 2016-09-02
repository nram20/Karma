import React from 'react'
import { TouchableOpacity, ListView, View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'native-base'
import JobCard from '../Components/JobCard'
import firebase from 'firebase'
import { db } from '../Config/FirebaseConfig'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/JobDetailsViewStyle'

class JobDetailsView extends React.Component {

  constructor (props) {
    super(props)

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    console.log('apples',this.props)
    let applicantDataSource = ds.cloneWithRows(this.props.applicants || {})

    this.state = {
      applicantDataSource
    }

    this._renderItem = this._renderItem.bind(this)
    this.applyToJob = this.applyToJob.bind(this)
    this.unapplyToJob = this.unapplyToJob.bind(this)
    this.cancelJob = this.cancelJob.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  logOut () {
    firebase.auth().signOut() 
  }

  applyToJob () {
    let jobKey = this.props.job.key
    let currUser = firebase.auth().currentUser.uid
    let applicantsRef = db.ref(`applicants/${jobKey}/${currUser}`)
    applicantsRef.set(true)
    let appliedRef = db.ref(`jobsAppliedFor/${currUser}/${jobKey}`)
    appliedRef.set(true)
    NavigationActions.pop()
  }

  unapplyToJob () {
    console.log('thispropsjob',this.props.job)
    let jobKey = this.props.job.key
    let currUser = firebase.auth().currentUser.uid
    let applicantsRef = db.ref(`applicants/${jobKey}/${currUser}`)
    applicantsRef.remove()
    let appliedRef = db.ref(`jobsAppliedFor/${currUser}/${jobKey}`)
    appliedRef.remove()
    // this.props.actions.unapplyToJob(this.props.job)
  }

  cancelJob () {
    let jobKey = this.props.job.key
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
    NavigationActions.pop()

  }

  render () {
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

    let controls
    if (poster === currUser) {
      controls = (
        <View>
          <Button onPress={this.cancelJob}>Cancel Job</Button> 
          <Text style={{color: 'grey'}}>Applicants:</Text>
          <ListView
            tabLabel="Jobs I've Posted"
            dataSource={this.state.applicantDataSource}
            removeClippedSubviews={false}
            renderRow={this._renderItem}
            enableEmptySections
          />
        </View>
      )
    } else if (this.props.appliedJobs && Object.keys(this.props.appliedJobs).includes(this.props.job.key)) {
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
          <Text style={styles.text}>Key: {key}</Text>
          {controls}
          <Button onPress={this.logOut}>Log the Fuck Out</Button>
        </ScrollView>
      </View>
    )
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      applicantDataSource: this.state.applicantDataSource.cloneWithRows(nextProps.applicants || {})
    })
  }

  _renderItem (userId) {
    console.log(userId)
    return (
      <TouchableOpacity onPress={() => console.log('name touched')} >
        <Text style={{color: 'white'}}>{userId}</Text>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.selectedJob,
    applicants: state.jobs.selectedJob.applicants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dashboard: NavigationActions.dashboard,
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsView)
