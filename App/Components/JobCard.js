import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles/JobCardStyle'
import { Container, Content, Card, CardItem, Text } from 'native-base'

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
      poster
    } = this.props.item
    const { item, handleClick } = this.props
    return (
      <Container>
        
        <Content>
          <Card>
            <CardItem>
              <Text>
                {title}
              </Text>
              <Text note>
                {poster}
              </Text>
            </CardItem>
            <CardItem cardBody>
              <TouchableOpacity onPress={() => handleClick(item)} >
                <Text style={styles.text}>Where: {location}</Text>
                <Text style={styles.text}>Karma: {cost}</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
        </Content>

      </Container>
    )
  }
}
