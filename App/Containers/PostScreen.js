import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { db, geoFire } from '../Config/FirebaseConfig'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Alert } from 'react-native'

// Styles
import styles from './Styles/PostScreenStyle'

class PostScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {}

    this.changeTitle = this.changeTitle.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
    this.changeCost = this.changeCost.bind(this)
    this.post = this.post.bind(this)
  }

  post () {
    if (!this.state.title || !this.state.description || !this.state.cost) {
          Alert.alert('One small problem...', 'Looks like you missed a field.')
    }
    let jobRef = db.ref('jobs')
    let currUser = firebase.auth().currentUser
    let userRef = db.ref(`users/${currUser.uid}`)
    userRef.once('value')
      .then(userDataSnap => {
        let userData = userDataSnap.val()
        console.log('currKar',userData.currentKarma)
        if (userData.currentKarma >= this.state.cost) {
          userData.currentKarma -= this.state.cost
          userRef.set(userData)
          let jobToAdd = Object.assign({}, this.state)
          jobToAdd.poster = currUser.uid
          jobToAdd.posterName = currUser.displayName
          jobToAdd.location = [this.props.location.latitude, this.props.location.longitude]
          let jobKey = jobRef.push(jobToAdd).key
          geoFire.set(jobKey, [this.props.location.latitude, this.props.location.longitude]).catch(err => console.log(err))
          let postedRef = db.ref(`jobsPosted/${currUser.uid}/${jobKey}`)
          postedRef.set(true)

          this.setState({
            title: '',
            description: '',
            cost: ''
          })
        } else {
          Alert.alert('One small problem...', 'You don\'t have that much karma. Help yourself by helping others!')
        }
      })
  }

  changeTitle (title) {
    this.setState({title})
  }

  changeDescription (description) {
    this.setState({description})
  }

  changeCost (cost) {
    this.setState({cost})
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Post a Job</Text>
        <View style={styles.container}>
          <Text style={styles.feedback} />
          <TextInput
            onChangeText={this.changeTitle}
            placeholder='Title'
            style={styles.input}
            value={this.state.title}
          />
          <TextInput
            onChangeText={this.changeDescription}
            placeholder='Description'
            style={styles.input}
            value={this.state.description}
          />
          <TextInput
            onChangeText={this.changeCost}
            placeholder='Cost'
            style={styles.input}
            value={this.state.cost}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.post}
          >
            <Text style={styles.button}>
              Post Job
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location.currLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)
