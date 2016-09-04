import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

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
    padding: 40,
    backgroundColor: '#50a2a7',
    marginTop: Metrics.navBarHeight
  },
  header: {
    backgroundColor: Colors.cyan

  },
  body: {
    flex: 24
  },
  buttonSuccessText: {
    color: '#9b2915',
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: white,
    height: 50,
    margin: 2
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
    textAlign: 'center',
    color: white
  },
  title: {
    textAlign: 'center'
  }
})
