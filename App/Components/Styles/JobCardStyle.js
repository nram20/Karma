import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.sectionTitle,
    flex: 1,
    paddingTop: Metrics.titlePadding,
    borderRadius: 5
  },
  text: {
    fontWeight: '500'
  }
})
