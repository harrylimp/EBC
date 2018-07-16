import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

import Draggable from '../card/Draggable';

export default class CardCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: {},
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <Draggable x={30} y={100}>
          <Text>
            Same
          </Text>
        </Draggable>
        <Text>
          Same
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
