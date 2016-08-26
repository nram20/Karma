import React, {PropTypes} from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './Styles/BottomNavStyle'

class BottomNav extends React.Component {

  static propTypes = {
    dashboard: PropTypes.func,
    post: PropTypes.func,
    jobs: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    console.log(NavigationActions)
    return (
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.props.post}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.props.jobs}>
          <Text style={styles.buttonText}>Jobs</Text></TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('navacts', NavigationActions)
  console.log('navactslog', NavigationActions.loginScreen)
  return {
    dashboard: NavigationActions.dashboard,
    post: NavigationActions.post,
    jobs: NavigationActions.jobs
  }
}

export default connect(null, mapDispatchToProps)(BottomNav)
