import React, {PropTypes} from 'react'
import { ScrollView, Text, Image, View, TextInput, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

class RegisterScreen extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Karma - Register</Text>
        <View style={styles.container}>
          <Text style={styles.feedback}></Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={true}
          />
          <TouchableOpacity 
            style={styles.buttonContainer}
          >
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <TouchableOpacity
            onPress={this.props.presentationScreen}
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    presentationScreen: NavigationActions.presentationScreen,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
