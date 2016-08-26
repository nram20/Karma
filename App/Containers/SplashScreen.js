import React from 'react'
import { Text, View } from 'react-native'

// Styles
import styles from './Styles/PresentationScreenStyle'

const SplashScreen = () =>
  <View style={styles.mainContainer}>
    <Text>This is the first screen you see when you're logged in!</Text>
  </View>

export default SplashScreen
