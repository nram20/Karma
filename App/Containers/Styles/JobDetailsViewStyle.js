import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
/* ApplicationStyles */
export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  text: {
    color: 'blue'
  }
})
