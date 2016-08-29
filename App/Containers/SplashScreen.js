import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'native-base'

// Styles
import styles from './Styles/PresentationScreenStyle'

const SplashScreen = () =>
  <View style={styles.mainContainer}>
    <Text>This is the first screen you see when you're logged in!</Text>
    <Button onPress={() => { console.log('hi test') }}> Click Me! </Button>
  </View>

export default SplashScreen
