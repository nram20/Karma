import React, {PropTypes} from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import firebase from 'firebase'
import { db } from '../Config/FirebaseConfig'
import { Container, Header, Button, Title, Content, Input, InputGroup, Icon } from 'native-base'

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
      displayName: '',
      password: '',
      passwordConfirmation: ''
    }

    this.changeEmail = this.changeEmail.bind(this)
    this.changeDisplayName = this.changeDisplayName.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changePasswordConfirmation = this.changePasswordConfirmation.bind(this)
    this.register = this.register.bind(this)
  }

  register () {
    if (this.state.password === this.state.passwordConfirmation) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          user.updateProfile({ displayName: this.state.displayName })
          let userToAdd = {}
          userToAdd.displayName = this.state.displayName
          userToAdd.currentKarma = 30
          userToAdd.totalKarma = 30
          let ref = db.ref(`users/${user.uid}`)
          ref.set(userToAdd)
        })
        .catch(error => {
          Alert.alert('One small problem...', error.message)
        })
    } else {
      Alert.alert('Error', 'Passwords don\'t match')
    }
  }

  changeEmail (email) {
    this.setState({email})
  }

  changeDisplayName (displayName) {
    this.setState({displayName})
  }

  changePassword (password) {
    this.setState({password})
  }

  changePasswordConfirmation (passwordConfirmation) {
    this.setState({passwordConfirmation})
  }

  render () {
    return (
      <Container>
        <Header>
          <Title> Register</Title>
        </Header>

        <Content style={styles.container}>
          <InputGroup style={styles.input}>
            <Icon name='ios-person' />
            <Input
              onChangeText={this.changeEmail}
              placeholder='Email'
            />
          </InputGroup>

          <InputGroup style={styles.input}>
            <Icon name='ios-person' />
            <Input
              onChangeText={this.changeDisplayName}
              placeholder='Username'
            />
          </InputGroup>

          <InputGroup style={styles.input}>
            <Icon name='ios-unlock' />
            <Input
              onChangeText={this.changePassword}
              placeholder='Password'
              secureTextEntry
            />
          </InputGroup>

          <InputGroup style={styles.input}>
            <Icon name='ios-unlock' />
            <Input
              onChangeText={this.changePasswordConfirmation}
              placeholder='Confirm Password'
              secureTextEntry
            />
          </InputGroup>

          <Button block success iconRight onPress={this.register}>
            Sign Up for Karma! <Icon name='ios-arrow-forward' />
          </Button>
          <Button small block iconLeft onPress={this.props.loginScreen}>
            Back to Login <Icon name='ios-arrow-back' />
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginScreen: NavigationActions.loginScreen
  }
}

export default connect(null, mapDispatchToProps)(RegisterScreen)
