import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import ViewCard from '../card/ViewCard';

export default class CardCarousel extends Component {
  _renderItem({ item, index }) {
    console.log('item', item);
    return (
      <TouchableOpacity onPress={() => Actions.viewCard({ cards: item.cards, gifs: item.gifs })}>
        <ViewCard style={styles.card} cards={item.cards} gifs={item.gifs} preview />
      </TouchableOpacity>
    );
  }

  render() {
    const cards = [
      {
        cards: [
          {
            id: 0,
            xCoordinate: -203.84872436523438,
            yCoordinate: 136.7529067993164,
            type: 'name',
            text: 'Charles',
            editable: false,
            menuOpen: false,
            style: { fontSize: 24, fontFamily: 'normal', color: '#373daeff' }
          },
          {
            id: 1,
            xCoordinate: -180.548835754394539,
            yCoordinate: 120.489013671875,
            type: 'company',
            text: 'University of Auckland',
            editable: false,
            menuOpen: false,
            style: { fontSize: 18, fontFamily: 'sans-serif-light', color: '#373daeff' }
          },
          {
            id: 2,
            xCoordinate: -208.4105453491211,
            yCoordinate: 120.83595275878906,
            type: 'email',
            text: 'charles@gmail.com',
            editable: false,
            menuOpen: false,
            style: { fontSize: 16, fontFamily: 'sans-serif-light', color: '#373daeff' }
          }
        ],
        gifs: [
          {
            id: 0,
            xCoordinate: 223.20837402343755,
            yCoordinate: -168.47762966156006,
            gif: 'UOA',
            menuOpen: false
          }
        ]
      },
      {
        cards: [
          {
            id: 0,
            xCoordinate: -203.84872436523438,
            yCoordinate: 136.7529067993164,
            type: 'name',
            text: 'Charles',
            editable: false,
            menuOpen: false,
            style: { fontSize: 16, fontFamily: 'normal', color: '#373daeff' }
          },
          {
            id: 1,
            xCoordinate: -180.548835754394539,
            yCoordinate: 120.489013671875,
            type: 'company',
            text: 'University of Auckland',
            editable: false,
            menuOpen: false,
            style: { fontSize: 18, fontFamily: 'sans-serif-light', color: '#373daeff' }
          }
        ],
        gifs: [
          {
            id: 0,
            xCoordinate: 223.20837402343755,
            yCoordinate: -168.47762966156006,
            gif: 'UOA',
            menuOpen: false
          }
        ]
      },
      {
        cards: [
          {
            id: 0,
            xCoordinate: -203.84872436523438,
            yCoordinate: 136.7529067993164,
            type: 'name',
            text: 'Harrison',
            editable: false,
            menuOpen: false,
            style: { fontSize: 16, fontFamily: 'normal', color: '#373daeff' }
          },
          {
            id: 1,
            xCoordinate: -180.548835754394539,
            yCoordinate: 120.489013671875,
            type: 'company',
            text: 'University of Auckland',
            editable: false,
            menuOpen: false,
            style: { fontSize: 18, fontFamily: 'sans-serif-light', color: '#373daeff' }
          }
        ],
        gifs: [
          {
            id: 0,
            xCoordinate: 223.20837402343755,
            yCoordinate: -6.47762966156006,
            gif: 'heartland',
            menuOpen: false
          }
        ]
      }
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
