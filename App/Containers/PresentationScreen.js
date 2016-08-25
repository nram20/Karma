import React, {PropTypes} from 'react'
import { ScrollView, Text, Image, View, TextInput, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Karma - Splash Page / Login</Text>
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
          <TouchableOpacity 
            style={styles.buttonContainer}
          >

            <Text style={styles.button}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.links}>
            <TouchableOpacity>
              <Text style={styles.link}>
                Forgot Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
