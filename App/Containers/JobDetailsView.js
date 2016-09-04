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
    let applicantDataSource = ds.cloneWithRows(this.props.applicants|| {})

    this.state = {
      applicantDataSource,
      usersData: []
    }

    this._renderItem = this._renderItem.bind(this)
    this.clearApplicantsListInFirebase = this.clearApplicantsListInFirebase.bind(this)
    this.applyToJob = this.applyToJob.bind(this)
    this.unapplyToJob = this.unapplyToJob.bind(this)
    this.hireApplicant = this.hireApplicant.bind(this)
    this.markCompleted = this.markCompleted.bind(this)
    this.cancelJob = this.cancelJob.bind(this)
    this.logOut = this.logOut.bind(this)
    this.getUsersData = this.getUsersData.bind(this)

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
    let jobKey = this.props.job.key
    let currUser = firebase.auth().currentUser.uid
    let applicantsRef = db.ref(`applicants/${jobKey}/${currUser}`)
    applicantsRef.remove()
    let appliedRef = db.ref(`jobsAppliedFor/${currUser}/${jobKey}`)
    appliedRef.remove()
  }

  hireApplicant (applicant) {
    let currUser = firebase.auth().currentUser.uid
    let jobKey = this.props.job.key
    let jobRef = db.ref(`jobs/${jobKey}/hired`)
    jobRef.set(applicant)
    let workingRef = db.ref(`jobsWorking/${applicant.id}/${jobKey}`)
    workingRef.set(true)
    this.clearApplicantsListInFirebase()
  }

  cancelJob () {
    let jobKey = this.props.job.key
    let currUser = firebase.auth().currentUser.uid
    let hiredUser = this.props.job.hired.id

    db.ref(`jobsPosted/${currUser}/${jobKey}`).remove()
    db.ref(`jobsWorking/${currUser}/${jobKey}`).remove()
    db.ref(`jobs/${jobKey}`).remove()
    db.ref(`locations/${jobKey}`).remove()
    db.ref(`locations/${jobKey}`).remove()
    if(this.props.job.hired.id !== undefined) {
      db.ref(`jobsWorking/${hiredUser}/${jobKey}`).remove()
    }
    let userRef = db.ref(`users/${currUser.uid}`)
    userRef.once('value')
      .then(userDataSnap => {
        let userData = userDataSnap.val()
        userData.currentKarma = +userData.currentKarma + +this.props.job.cost
        userRef.set(userData)
      })
  }

  markCompleted () {
    let jobKey = this.props.job.key
    let currUser = firebase.auth().currentUser.uid
    let hiredUser = this.props.job.hired.id

    db.ref(`jobs/${jobKey}`).remove()
    db.ref(`jobsPosted/${currUser}/${jobKey}`).remove()
    db.ref(`jobsWorking/${hiredUser}/${jobKey}`).remove()
    db.ref(`locations/${jobKey}`).remove()
    db.ref(`locations/${jobKey}`).remove()

    let userRef = db.ref(`users/${hiredUser}`)
    userRef.once('value')
      .then(userDataSnap => {
        let userData = userDataSnap.val()
        userData.currentKarma = +this.props.job.cost + +userData.currentKarma
        userData.totalKarma = +this.props.job.cost + +userData.totalKarma
        userRef.set(userData)
      })

    this.clearApplicantsListInFirebase()
    NavigationActions.pop()
  }

  clearApplicantsListInFirebase() {
    let jobKey = this.props.job.key
    let applicantsRef = db.ref(`applicants/${jobKey}`)
    return applicantsRef.once('value')
      .then(applicants => {
        if (applicants.val()) {
          let applicantsArray = Object.keys(applicants.val())
          applicantsArray.forEach(applicant => {
            db.ref(`jobsAppliedFor/${applicant}/${jobKey}`).remove()
            db.ref(`applicants/${jobKey}`).remove()
          })
        }
      })
      .catch(console.log)
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

    let applicants
    if (this.props.job.hired) {
      applicants = (
        <View>
          <Button onPress={this.markCompleted}>Job Completed</Button>
          <Text style={{color: 'grey'}}>Hired Applicant:</Text>
          <Text>{this.props.job.hired.id}</Text>
          {/* <Text>{this.props.job.hired.id}</Text> */}
        </View>
      )
    } else {
      applicants = (
        <View>
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
    }

    let controls
    if (poster === currUser) {
      controls = (
        <View>
          <Button onPress={this.cancelJob}>Cancel Job</Button>
          {applicants}
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
          <Button onPress={this.logOut}>Log Out (development only)</Button>
        </ScrollView>
      </View>
    )
  }

  componentWillReceiveProps (nextProps) {
    this.getUsersData(nextProps.applicants || [])
  }

  componentDidMount () {
    this.getUsersData(this.props.applicants || [])
  }

  getUsersData(usersArray) {
    applicantPromiseArray = []
    usersArray.forEach(userId => {
      let applicantRef = db.ref(`users/${userId}`)
      applicantPromiseArray.push(
        applicantRef.once('value')
          .then(userData => {
            let dataObj = userData.val()
            dataObj.id = userId
            return dataObj 
          })
      )
    })

    Promise.all(applicantPromiseArray)
      .then(usersData => {
        this.setState({
          applicantDataSource: this.state.applicantDataSource.cloneWithRows(usersData || {})
        })
      })
  }

  _renderItem (applicant) {
    return (
      <TouchableOpacity onPress={() => this.hireApplicant(applicant)} >
        <Text style={{color: 'white'}}>{applicant.id}</Text>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.selectedJob,
    appliedJobs: state.jobs.appliedJobs,
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
