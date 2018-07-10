import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CardCarousel from '../carousel/CardCarousel';
import CircularButton from '../buttons/CircularButton';
import ControlButtons from '../buttons/ControlButtons';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class NavigatedScreen extends Component<Props> {
  render() {
    const leftButton = {icon: {name: 'adb'}};

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.welcome}>
            Navigated Screen
          </Text>
          <Text style={styles.instructions}>
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>
        <CardCarousel />
        <ControlButtons
          leftButton={leftButton}
          rightButton={{name:'adb'}}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091113',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  main: {
    flex: 0.8,
  }
});
