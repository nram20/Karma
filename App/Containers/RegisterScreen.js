import React, {PropTypes} from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import firebase from 'firebase'

// Styles
import styles from './Styles/PresentationScreenStyle'

class RegisterScreen extends React.Component {

  static propTypes = {
    presentationScreen: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }

    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changePasswordConfirmation = this.changePasswordConfirmation.bind(this)
    this.register = this.register.bind(this)
  }

  register () {
    if (this.state.password === this.state.passwordConfirmation) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    } else {
      //  some alert that passwords don't match
    }
  }

  changeEmail (email) {
    this.setState({email})
  }

  changePassword (password) {
    this.setState({password})
  }

  changePasswordConfirmation (passwordConfirmation) {
    this.setState({passwordConfirmation})
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Karma - Register</Text>
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
          <TextInput
            onChangeText={this.changePasswordConfirmation}
            placeholder='Confirm Password'
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.register}
          >
            <Text style={styles.button}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.links}>
            <TouchableOpacity
              onPress={this.props.loginScreen}
            >
              <Text style={styles.link}>
                Log In
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
    loginScreen: NavigationActions.loginScreen
  }
}

export default connect(null, mapDispatchToProps)(RegisterScreen)
