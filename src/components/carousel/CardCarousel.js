import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import ViewCard from '../card/ViewCard';
import templates from '../card/Templates';

export default class CardCarousel extends Component {
  _renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() =>
          Actions.viewCard({
            cards: item.cards,
            gifs: item.gifs,
            style: { backgroundColor: item.backgroundColor, flex: 1 }
          })}
      >
        <ViewCard
          style={{
            width: 296,
            height: 144,
            backgroundColor: item.backgroundColor
          }}
          cards={item.cards}
          gifs={item.gifs}
          preview
        />
      </TouchableOpacity>
    );
  }

  render() {
    const cards = templates;

    //AsyncStorage.setItem('collectedCards', cards);

    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={cards}
        renderItem={this._renderItem}
        sliderHeight={Dimensions.get('window').height * 0.8}
        itemHeight={Dimensions.get('window').height * 0.2}
        containerCustomStyle={{ overflow: 'visible' }}
        contentContainerCustomStyle={{ overflow: 'visible' }}
        vertical={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: 296,
    height: 144,
    backgroundColor: 'white'
  }
});
