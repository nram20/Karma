import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import db from '../Config/FirebaseConfig'

// Styles
import styles from './Styles/PostScreenStyle'

class PostScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      location: '',
      cost: ''
    }

    console.log(firebase.auth().currentUser)
    this.changeTitle = this.changeTitle.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
    this.changeLocation = this.changeLocation.bind(this)
    this.changeCost = this.changeCost.bind(this)
    this.post = this.post.bind(this)
  }

  post () {
    let jobRef = db.ref('jobs')
    let currUser = firebase.auth().currentUser.uid
    let jobToAdd = Object.assign({}, this.state)
    jobToAdd.poster = currUser
    let jobKey = jobRef.push(jobToAdd).key
    let postedRef = db.ref(`jobsPosted/${currUser}/${jobKey}`)
    postedRef.set(true)
  }

  changeTitle (title) {
    this.setState({title})
  }

  changeDescription (description) {
    this.setState({description})
  }

  changeLocation (location) {
    this.setState({location})
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
          />
          <TextInput
            onChangeText={this.changeDescription}
            placeholder='Description'
            style={styles.input}
          />
          <TextInput
            onChangeText={this.changeLocation}
            placeholder='Location'
            style={styles.input}
          />
          <TextInput
            onChangeText={this.changeCost}
            placeholder='Cost'
            style={styles.input}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)
