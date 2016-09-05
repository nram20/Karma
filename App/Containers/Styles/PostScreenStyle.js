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
    justifyContent: 'center',
    padding: 40
  },
  header: {
    marginTop: 60,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: '#9b2915',
    fontWeight: 'bold'
  },
  body: {
    flex: 24
  },
  card: {
    margin: 4
  },
  innerInput: {
    marginTop: 15,
  },
  input: {
    backgroundColor: white,
    height: 50,
    marginBottom: 2,
  },
  inputGroup : {
    borderColor: 'grey',
    flex: 1,
    borderBottomWidth: 2,
    marginBottom: 4,
    marginRight: 5,
    marginLeft: 5
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    marginBottom: -7,
    justifyContent: 'space-between',
    color: 'white',
    fontWeight: '700'
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  link: {
  },
  title: {
    textAlign: 'center'
  }
})
