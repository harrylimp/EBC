import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

class FirebaseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testValue: 'Test Value'
    };

    this.ref = firebase.firestore().collection('todos');

    this.ref.add({
      title: 'Incoming value',
      complete: false
    });
  }

  setRandomValue = () => {};

  getRandomValue = () => {};

  render() {
    return (
      <View>
        <Text>{this.state.testValue}</Text>
      </View>
    );
  }
}

export default FirebaseScreen;
