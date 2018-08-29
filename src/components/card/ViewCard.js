import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, TextInput, Image } from 'react-native';
import CardComponent from './CardComponent';
import Orientation from 'react-native-orientation';

export default class ViewCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: props.cards,
      gifs: props.gifs,
      preview: props.preview
    };
  }

  componentDidMount = async () => {
    // const cardPromise = await AsyncStorage.getItem('myCard');
    // const card = cardPromise == null ? null : JSON.parse(cardPromise);
    // console.log('is ther update', card);
    // if (card) {
    //   this.setState({ cards: card.cards, gifs: card.gifs });
    // }
    !this.props.preview && Orientation.lockToLandscape();
  };

  componentWillUnmount = () => {
    Orientation.unlockAllOrientations();
  };

  render() {
    const { cards, gifs, preview, backgroundColor } = this.state;
    const { style } = this.props;
    console.log('hello?', style);
    const GIFList = {
      UOA: require('../../Icons/UOA.gif'),
      rocket: require('../../Icons/rocket.gif'),
      heartland: require('../../Icons/heartland.gif')
    };

    return (
      <View style={style}>
        {cards &&
          cards.map(card => (
            <CardComponent
              key={card.id}
              id={card.id}
              x={preview ? card.xCoordinate / 2.5 : card.xCoordinate}
              y={preview ? card.yCoordinate / 2.75 : card.yCoordinate}
              style={{ zIndex: card.id, position: 'absolute' }}
            >
              <TextInput
                editable={false}
                value={card.text}
                style={preview ? { ...card.style, fontSize: card.style.fontSize / 2 } : card.style}
                underlineColorAndroid={'transparent'}
              />
            </CardComponent>
          ))}
        {gifs &&
          gifs.map(gif => (
            <CardComponent
              key={gif.id}
              id={gif.id}
              x={preview ? gif.xCoordinate / 2.5 : gif.xCoordinate}
              y={preview ? gif.yCoordinate / 2.75 : gif.yCoordinate}
              style={{ zIndex: gif.id, position: 'absolute' }}
            >
              <Image source={GIFList[gif.gif]} style={preview ? styles.smallGif : styles.gif} />
            </CardComponent>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: 'brown'
  },
  draggable: {
    zIndex: 1
  },
  textInput: {
    color: 'black'
  },
  gif: {
    height: 75,
    width: 75
  },
  smallGif: {
    height: 30,
    width: 30
  }
});
