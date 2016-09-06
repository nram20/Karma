import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: '#50a2a7'
  },
  text: {
    color: 'blue',
    textAlign: 'center'
  },
  controls: {
    alignItems: 'center'
  }
})
