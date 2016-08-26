import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/JobsScreenStyle'

class JobsScreen extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>JobsScreen Container</Text>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen)
