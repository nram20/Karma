import React, {PropTypes} from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import firebase from 'firebase'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends React.Component {

  static propTypes = {
    register: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.login = this.login.bind(this)
  }

  login () {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        Alert.alert('One small problem...', error.message)
      })
  }

  changeEmail (email) {
    this.setState({email})
  }

  changePassword (password) {
    this.setState({password})
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Login</Text>
        <View style={styles.container}>
          <Text style={styles.feedback} />
          <TextInput
            onChangeText={this.changeEmail}
            placeholder='Email'
            style={styles.input}
          />
          <TextInput
            onChangeText={this.changePassword}
            placeholder='Password'
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.login}
          >
            <Text style={styles.button}>
              Sign In
            </Text>
          </TouchableOpacity>
          <View style={styles.links}>
            <TouchableOpacity>
              <Text style={styles.link}>
                Forgot Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.register}
            >
              <Text style={styles.link}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: NavigationActions.register,
    splash: NavigationActions.splash
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen)
