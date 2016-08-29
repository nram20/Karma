import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './Styles/JobCardStyle'

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
      description,
      location,
      cost,
      poster
    } = this.props.item
    console.log('title:', title, description)
    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>Where: {location}</Text>
        <Text style={styles.text}>Karma: {cost}</Text>
        <Text style={styles.text}>Poster : {poster}</Text>
        <Text style={styles.text}>Id: {this.props.id}</Text>
      </TouchableOpacity>
    )
  }
}
