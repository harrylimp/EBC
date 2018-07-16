import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

import Draggable from '../card/Draggable';
import CircularButton from '../buttons/CircularButton';

export default class CardCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    }
  };

  addDraggable = () => {
    const cards = this.state.cards;

    cards.push({
      id: this.state.cards.length,
      xCoordinate: 0,
      yCoordinate: 0,
    });

    console.log('what are me cards right now?', cards);

    this.setState({ cards: cards })

    console.log('what are me cards after +', this.state.cards);
  }

  render() {
    const { cards } = this.state;
    console.log('what is cards?', cards)
    return(
      <View style={styles.container}>
        {
          cards.map(card => 
          <Draggable
            key={card.id}
            x={card.xCoordinate}
            y={card.yCoordinate}
          >
            <Text>
              Hello?
            </Text>
          </Draggable>)
        }
        <Text>
          Same
        </Text>
        <CircularButton
          icon={{ name: 'add' }}
          nonTransparent
          onPress={ this.addDraggable }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
