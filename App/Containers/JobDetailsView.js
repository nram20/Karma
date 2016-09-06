import React from 'react'
import { TouchableOpacity, ListView, View, ScrollView, Text, Alert } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'firebase'
import { db } from '../Config/FirebaseConfig'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Container, Card, CardItem, Header, Button, Title, Content, Input, InputGroup, Icon } from 'native-base'
import Types from '../Actions/Types'
import { dispatch } from '../../index.ios'
// Styles
import styles from './Styles/JobDetailsViewStyle'

class JobDetailsView extends React.Component {

  constructor (props) {
    super(props)

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    let applicantDataSource = ds.cloneWithRows(this.props.applicants || {})

    this.state = {
      applicantDataSource,
      usersData: []
    }

    this._renderItem = this._renderItem.bind(this)
    this.clearApplicantsListInFirebase = this.clearApplicantsListInFirebase.bind(this)
    this.applyToJob = this.applyToJob.bind(this)
    this.changeMessage = this.changeMessage.bind(this)
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
    if (!this.state.message) {
      return Alert.alert('Are you sure?', 'Continue without leaving a message?(PUT BUTTON HERE\)')
    }
    let jobKey = this.props.job.key
    let currUser = firebase.auth().currentUser.uid
    let applicantsRef = db.ref(`applicants/${jobKey}/${currUser}`)
    applicantsRef.set(this.state.message || true)
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
    let jobKey = this.props.job.key
    let jobRef = db.ref(`jobs/${jobKey}/hired`)
    jobRef.set(applicant)
    let workingRef = db.ref(`jobsWorking/${applicant.id}/${jobKey}`)
    workingRef.set(true)
    this.setState({ hired: applicant })
    this.clearApplicantsListInFirebase()
    dispatch({ type: Types.HIRE_WORKER, jobKey, applicant })
  }

  cancelJob () {
    let jobKey = this.props.job.key
    let currUser = firebase.auth().currentUser.uid

    db.ref(`jobsPosted/${currUser}/${jobKey}`).remove()
    db.ref(`jobsWorking/${currUser}/${jobKey}`).remove()
    db.ref(`jobs/${jobKey}`).remove()
    db.ref(`locations/${jobKey}`).remove()
    db.ref(`locations/${jobKey}`).remove()

    if (this.props.job.hired !== undefined) {
      let hiredUser = this.props.job.hired.id
      db.ref(`jobsWorking/${hiredUser}/${jobKey}`).remove()
    }

    let userRef = db.ref(`users/${currUser}`)
    userRef.once('value')
      .then(userDataSnap => {
        let userData = userDataSnap.val()
        userData.currentKarma = +userData.currentKarma + +this.props.job.cost
        userRef.set(userData)
      })
    NavigationActions.pop()
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

  clearApplicantsListInFirebase () {
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

  changeMessage (message) {
    this.setState({message})
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
          <Text>{this.props.job.hired.displayName}</Text>
          <Text style={{color: 'white'}}>{this.props.job.hired.message}</Text>
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

    console.log('poster,currUser',poster,currUser)
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
    } else if (this.props.job.hired && this.props.job.hired.id === currUser) {
      controls = (
        <View>
          <Text>
            You are working this job. 
          </Text>
        </View>
      )
    } else {
      controls = (
        <View>
          <Button onPress={this.applyToJob}>Apply</Button>
          <InputGroup
            iconLeft
            style={styles.input}
          >
            <Icon name='ios-globe' />
            <Input
              style={styles.innerInput}
              iconLeft
              onChangeText={this.changeMessage}
              placeholder='Include a message with your application'
              value={this.state.title}
            />
          </InputGroup>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView>
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
    console.log('infogotten')
    this.getUsersData(nextProps.job.applicants || [])
  }

  componentDidMount () {
    this.getUsersData(this.props.job.applicants || [])
  }

  getUsersData (usersObj) {
    let applicantPromiseArray = []
    Object.keys(usersObj).forEach(userId => {
      let applicantRef = db.ref(`users/${userId}`)
      applicantPromiseArray.push(
        applicantRef.once('value')
          .then(userData => {
            let dataObj = userData.val()
            dataObj.id = userId
            dataObj.message = usersObj[userId]
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
        <Text style={{color: 'white'}}>{applicant.displayName}</Text>
        <Text style={{color: 'white'}}>{applicant.message}</Text>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.selectedJob,
    appliedJobs: state.jobs.appliedJobs,
    currLocation: state.location.currLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dashboard: NavigationActions.dashboard,
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsView)
