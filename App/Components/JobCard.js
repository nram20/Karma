import React from 'react'
import styles from './Styles/JobCardStyle'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container, Content, Card, Button, CardItem, Icon, List, ListItem } from 'native-base'
import GeoFire from 'geofire'



const burntRed = '#9b2915'
const gold = '#e9b44c'
const cyan = '#50a2a7'

export default class JobCard extends React.Component {

  // Prop type warnings
  static propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    location: React.PropTypes.string,
    cost: React.PropTypes.number,
    poster: React.PropTypes.string
  }

  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const {
      title,
      location,
      cost,
      poster,
      posterName
    } = this.props.item
    const { item, handleClick, currLocation } = this.props
    let currLocationLatLong = [currLocation.latitude, currLocation.longitude]
    let distance = (GeoFire.distance(location, currLocationLatLong)/1.609344).toFixed(1)
    return (  

      <Card style={{margin: 20, backgroundColor: cyan}}>
        <CardItem header style={{backgroundColor: gold, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: burntRed, fontWeight: '700', fontSize: 16}}>
              {title}
            </Text>
        </CardItem>
        <CardItem cardBody style={{backgroundColor: 'white'}}>
            <Text style={styles.text}>
              Poster:  {posterName}
            </Text>
            <Text style={styles.text}>Karma Offered: {cost}</Text>
            <Text style={styles.text}>{distance} miles away</Text>
        </CardItem>
          <Button block success iconRight onPress={() => handleClick(item)}>
            <Text style={{color: burntRed, fontWeight: '700'}}>View Job</Text> <Icon name='ios-arrow-forward' style={{color: '#9b2915'}}/>
          </Button>
      </Card>

    )
  }
}
