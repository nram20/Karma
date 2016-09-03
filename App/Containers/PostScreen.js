import React from 'react'
import { Text, View, ReactNative, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { db, geoFire } from '../Config/FirebaseConfig'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Container, Card, CardItem, Header, Button, Title, Content, Input, InputGroup, Icon } from 'native-base'

// Styles
import styles from './Styles/PostScreenStyle'

class PostScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {}

    this.changeTitle = this.changeTitle.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
    this.changeCost = this.changeCost.bind(this)
    this.post = this.post.bind(this)
  }


  componentDidMount () {

    console.log('postmounted');
  }

//   inputFocused (refName) {
//   setTimeout(() => {
//     let scrollResponder = this.refs.scrollView.getScrollResponder();
//     scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
//       React.findNodeHandle(this.refs[refName]),
//       110, //additionalOffset
//       true
//     );
//   }, 50);
// }


  post () {
    let jobRef = db.ref('jobs')
    let currUser = firebase.auth().currentUser
    let jobToAdd = Object.assign({}, this.state)
    console.log(currUser)
    jobToAdd.poster = currUser.uid
    jobToAdd.posterName = currUser.displayName
    jobToAdd.location = [this.props.location.latitude, this.props.location.longitude]
    let jobKey = jobRef.push(jobToAdd).key
    geoFire.set(jobKey, [this.props.location.latitude, this.props.location.longitude]).catch(err => console.log(err))
    let postedRef = db.ref(`jobsPosted/${currUser.uid}/${jobKey}`)
    postedRef.set(true)

    this.setState({
      title: '',
      description: '',
      cost: ''
    })
  }

  changeTitle (title) {
    this.setState({title})
  }

  changeDescription (description) {
    this.setState({description})
  }

  changeCost (cost) {
    this.setState({cost})
  }

  render () {
    return (

        <Container style={styles.mainContainer}>
          <Content>
            <Card>
              <CardItem header>
                <Text style={styles.cardHeader}>Job Title</Text>
              </CardItem>
                <InputGroup 
                  iconLeft
                  style={styles.input}
                >
                  <Icon name='ios-globe' />
                  <Input
                    iconLeft
                    onChangeText={this.changeTitle}
                    placeholder='What do you need help with?'
                    value={this.state.title}
                  />
                </InputGroup>
            </Card>         
            
            <Card>
              <CardItem header>
                <Text style={styles.cardHeader}>Description</Text>
              </CardItem>
                <InputGroup 
                  iconLeft
                  style={styles.input}
                >
                  <Icon name='ios-paper' />
                  <Input
                    iconLeft
                    onChangeText={this.changeDescription}
                    placeholder='Enter a Short Description'
                    value={this.state.description}
                  />
                </InputGroup>
            </Card> 
            <Card>
              <CardItem header>
                <Text style={styles.cardHeader}>Karma Offered</Text>
              </CardItem>
                <InputGroup 
                  iconLeft
                  style={styles.input}
                >
                  <Icon name='ios-heart' />
                  <Input
                    keyboardType='numeric'
                    iconLeft
                    onChangeText={this.changeCost}
                    placeholder='How much Karma do you want to give?'
                    value={this.state.cost}
                  />
                </InputGroup>
            </Card>             

            <Button block success iconRight onPress={this.post}>
              Post Job <Icon name='ios-arrow-forward' />
            </Button>        

            
            
          </Content>
        </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location.currLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)
