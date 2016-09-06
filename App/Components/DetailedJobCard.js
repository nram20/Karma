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
      description,
      poster,
      posterName
    } = this.props.item
    console.log(location)
    const { item, handleClick, currLocation } = this.props
    let currLocationLatLong = [currLocation.latitude, currLocation.longitude]
    let distance = (GeoFire.distance(location, currLocationLatLong)/1.609344).toFixed(1)
    return (


          <Card style={{margin: 20, backgroundColor: cyan}}>

            <CardItem header style={{backgroundColor: gold}}>
                <Text style={{color: burntRed, fontWeight: '700', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  {title}
                </Text>
            </CardItem>

            <CardItem cardBody style={{backgroundColor: 'white'}}>
                <Text style={styles.text}>
                  Poster:  {posterName}
                </Text>
                <Text style={styles.text}>Karma Offered: {cost}</Text>
                <Text style={styles.text}>Description: {description}</Text>
                <Text style={styles.text}>{distance} miles away</Text>
            </CardItem>

          </Card>





    )
  }
}
