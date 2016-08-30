import React, {PropTypes} from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import firebase from 'firebase'
import { Container, Header, Button, Title, Content, Input, InputGroup, Icon } from 'native-base';


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
      <Container>
        <Header>
          <Title>Login</Title>
        </Header>

        <Content style={styles.container}>
          <InputGroup style={styles.input}>
            <Icon name='ios-person' />
            <Input
            style={styles.input}
            onChangeText={this.changeEmail}
            placeholder='Email'
            />
          </InputGroup> 
          <InputGroup>
            <Icon name='ios-unlock' />
            <Input 
            style={styles.input}
            onChangeText={this.changePassword}
            placeholder='Password'
            secureTextEntry
            />
          </InputGroup>            
          
          <Button block success iconRight onPress={this.login}> 
            Sign In <Icon name="ios-arrow-forward"/>
          </Button>


          <View style={styles.links}>
            <Button small>
              <Text style={styles.link}>
                Forgot Password
              </Text>
            </Button>
            

            <Button small
              onPress={this.props.register}
            >
              <Text style={styles.link}>
                Sign Up
              </Text>
            </Button>
           </View> 
          </Content>            

      </Container>
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
