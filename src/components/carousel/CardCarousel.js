import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class CardCarousel extends Component {

  _renderItem({ item, index }) {
    return <View style={ styles.card }>
      <Text>
        {item.name}
      </Text>
    </View>
  }

  render() {
    const cards = [
      {
        name: 'Samule Li',
      },
      {
        name: 'Harry Lim',
      },
      {
        name: 'Danielle Lottridge',
      },
    ];

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
        vertical={ true }
      />
    );
  }

}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height : 100,
    backgroundColor: 'white',
  }
})