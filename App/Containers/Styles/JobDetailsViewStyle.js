import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

const burntRed = '#9b2915'
const gold = '#e9b44c'
const cyan = '#50a2a7'

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
  },
  button: {
    marginBottom: 1,
    backgroundColor: gold
  }
})
