import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

const black = '#000'
const white = '#fff'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 40
  },
  header: {
    marginTop: 60,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  body: {
    flex: 24
  },

  input: {
    backgroundColor: white,
    height: 50,
    margin: 2
    // textAlign: 'center'
  },
  buttonContainer: {
    backgroundColor: white,
    justifyContent: 'center',
    height: 50,
    borderColor: black,
    borderWidth: 1,
    borderRadius: 5,
    margin: 2
  },
  button: {
    textAlign: 'center'
  },
  links: {
    marginTop: 12.5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  link: {
    width: 125,
    textAlign: 'center'
  },
  title: {
    textAlign: 'center'
  }
})
