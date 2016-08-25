import React, {PropTypes} from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {

  static propTypes = {
    register: PropTypes.func
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Karma - Splash Page / Login</Text>
        <View style={styles.container}>
          <Text style={styles.feedback} />
          <TextInput
            placeholder='Email'
            style={styles.input}
          />
          <TextInput
            placeholder='Password'
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonContainer}
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: NavigationActions.register
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
