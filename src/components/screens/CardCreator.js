import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Image
} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';
import Orientation from 'react-native-orientation';

import Draggable from '../card/Draggable';
import IconButton from '../buttons/IconButton';
import StylingMenu from '../menu/StylingMenu';
import DeleteMenu from '../menu/DeleteMenu';

export default class CardCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      gifs: [],
      open: false,
      gifScreen: false,
      currentText: '',
      backgroundColor: 'white'
    };
  }

  componentDidMount = async () => {
    console.disableYellowBox = true;
    Orientation.lockToLandscape();
    const cardPromise = await AsyncStorage.getItem('myCard');
    const card = cardPromise == null ? null : JSON.parse(cardPromise);
    const backgroundColor = card.backgroundColor ? card.backgroundColor : 'white';
    if (card) {
      this.setState({ cards: card.cards, gifs: card.gifs, backgroundColor });
    }
  };

  componentWillUnmount = () => {
    Orientation.unlockAllOrientations();
  };

  save = async () => {
    let cards = this.state.cards;
    let gifs = this.state.gifs;
    let myCard = { cards, gifs };
    const goodFeels = await AsyncStorage.setItem('myCard', JSON.stringify(myCard));
  };

  addDraggable = type => {
    const cards = this.state.cards.slice();

    let id = 0;

    if (cards.length > 0) {
      id = cards[cards.length - 1].id + 1;
    }

    cards.push({
      id: id,
      xCoordinate: 30,
      yCoordinate: 30,
      type: type,
      text: '',
      editable: false,
      menuOpen: false,
      style: {
        fontSize: 20,
        color: '#a0a0a0',
        fontFamily: 'normal'
      }
    });

    this.setState({ cards: cards, open: false });
  };

  addGif = gif => {
    const gifs = this.state.gifs.slice();

    let id = 0;

    if (gifs.length > 0) {
      id = gifs[gifs.length - 1].id + 1;
    }

    gifs.push({
      id: id,
      xCoordinate: 0,
      yCoordinate: 0,
      gif: gif,
      menuOpen: false
    });

    this.setState({ gifs: gifs, open: false });
  };

  handleToggleMenu = () => {
    this.setState({
      open: !this.state.open,
      gifScreen: false
    });
  };

  handleCardPress = id => {
    const updatedCards = this.state.cards.slice();

    const index = updatedCards.map(card => card.id).indexOf(id);

    updatedCards[index] = Object.assign(updatedCards[index], {
      menuOpen: !updatedCards[index].menuOpen
    });
    this.setState({
      cards: updatedCards
    });
  };

  handleEditPress = id => {
    const updatedCards = this.state.cards.slice();

    const index = updatedCards.map(card => card.id).indexOf(id);

    const editable = updatedCards[index].editable;
    const reference = `textInput${id}`;

    updatedCards[index] = Object.assign(updatedCards[index], {
      editable: !editable,
      menuOpen: false
    });
    this.setState({
      cards: updatedCards
    });
    !editable && this.refs[reference].focus();
    editable && this.save();
  };

  handleTextChange = (id, text) => {
    const updatedCards = this.state.cards.slice();
    const index = updatedCards.map(card => card.id).indexOf(id);
    updatedCards[index] = Object.assign(updatedCards[index], { text: text });
    this.setState({
      cards: updatedCards
    });
  };

  handleStyleChange = async (id, style) => {
    const updatedCards = this.state.cards.slice();
    const index = updatedCards.map(card => card.id).indexOf(id);
    updatedCards[index] = Object.assign(updatedCards[index], { style: style });
    this.setState({
      cards: updatedCards
    });
    const myCard = {
      cards: updatedCards,
      gifs: this.state.gifs,
      backgroundColor: this.state.backgroundColor
    };
    const saving = await AsyncStorage.setItem('myCard', JSON.stringify(myCard));
  };

  handleDelete = async id => {
    const updatedCards = this.state.cards.slice();

    const index = updatedCards.map(card => card.id).indexOf(id);

    updatedCards.splice(index, 1);

    this.setState({
      cards: updatedCards
    });
    const myCard = {
      cards: updatedCards,
      gifs: this.state.gifs,
      backgroundColor: this.state.backgroundColor
    };
    const saving = await AsyncStorage.setItem('myCard', JSON.stringify(myCard));

    this.forceUpdate();
  };

  handleLocationUpdate = async updateInfo => {
    const updateCards = this.state.cards.slice();
    const index = updateCards.map(card => card.id).indexOf(updateInfo.id);
    updateCards[index] = Object.assign(updateCards[index], {
      xCoordinate: updateInfo.x,
      yCoordinate: updateInfo.y
    });
    this.setState({
      cards: updateCards
    });
    let cards = this.state.cards;
    const myCard = {
      cards: updateCards,
      gifs: this.state.gifs,
      backgroundColor: this.state.backgroundColor
    };
    const saving = await AsyncStorage.setItem('myCard', JSON.stringify(myCard));
  };

  handleGifLocationUpdate = async updateInfo => {
    const updateGifs = this.state.gifs.slice();
    const index = updateGifs.map(gifs => gifs.id).indexOf(updateInfo.id);
    updateGifs[index] = Object.assign(updateGifs[index], {
      xCoordinate: updateInfo.x,
      yCoordinate: updateInfo.y
    });
    this.setState({
      gifs: updateGifs
    });
    const myCard = {
      cards: this.state.cards,
      gifs: updateGifs,
      backgroundColor: this.state.backgroundColor
    };
    const update = await AsyncStorage.setItem('myCard', JSON.stringify(myCard));
  };

  handleGifPress = id => {
    const updatedGifs = this.state.gifs.slice();

    const index = updatedGifs.map(gif => gif.id).indexOf(id);

    updatedGifs[index] = Object.assign(updatedGifs[index], {
      menuOpen: !updatedGifs[index].menuOpen
    });
    this.setState({
      gifs: updatedGifs
    });
  };

  handleGifDelete = async id => {
    const updatedGifs = this.state.gifs.slice();
    const index = updatedGifs.map(gif => gif.id).indexOf(id);
    updatedGifs.splice(index, 1);

    this.setState({
      gifs: updatedGifs
    });
    const myCard = {
      cards: this.state.cards,
      gifs: updatedGifs,
      backgroundColor: this.state.backgroundColor
    };
    const saving = await AsyncStorage.setItem('myCard', JSON.stringify(myCard));

    this.forceUpdate();
  };

  render() {
    const { cards, gifs, backgroundColor, open } = this.state;
    const { Popover } = renderers;

    // Horrible but temporary solution
    const GIFList = {
      UOA: require('../../Icons/UOA.gif'),
      rocket: require('../../Icons/rocket.gif'),
      heartland: require('../../Icons/heartland.gif'),
      burger: require('../../Icons/burger.gif')
    };

    const SubMenu = () => {
      let gifScreen = this.state.gifScreen;

      return gifScreen ? (
        <View style={{ flex: 1, backgroundColor: '#ededed', paddingTop: 50, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.addGif('UOA')}>
            <Image source={GIFList.UOA} style={styles.gif} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.addGif('rocket')}>
            <Image source={GIFList.rocket} style={styles.gif} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.addGif('burger')}>
            <Image source={GIFList.burger} style={styles.gif} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#ededed', paddingTop: 50 }}>
          <ScrollView>
            <List containerStyle={{ marginBottom: 20 }}>
              <ListItem title={'Name'} onPress={() => this.addDraggable('name')} />
              <ListItem title={'Email'} onPress={() => this.addDraggable('email')} />
              <ListItem title={'Company'} onPress={() => this.addDraggable('company')} />
              <ListItem title={'Number'} onPress={() => this.addDraggable('number')} />
              <ListItem title={'Text'} onPress={() => this.addDraggable('text')} />
              <ListItem title={'GIF'} onPress={() => this.setState({ gifScreen: true })} />
            </List>
          </ScrollView>
        </View>
      );
    };

    return (
      <SideMenu
        isOpen={this.state.open}
        menu={SubMenu()}
        onChange={isOpen => !isOpen && this.setState({ open: false })}
        disableGestures
        menuPosition={'right'}
        openMenuOffset={120}
      >
        <View style={{ flex: 1, flexWrap: 'wrap', backgroundColor }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: backgroundColor,
              justifyContent: 'flex-end'
            }}
          >
            <IconButton icon={{ name: 'add-box' }} onPress={this.handleToggleMenu} black />
          </View>
          {cards &&
            cards.map(card => {
              const onPress = () => this.handleCardPress(card.id);
              const onEdit = () => this.handleEditPress(card.id);
              const onSave = () => this.save();
              const onDelete = () => this.handleDelete(card.id);
              const onStyleChange = style => this.handleStyleChange(card.id, style);

              return (
                <Draggable
                  key={card.id}
                  id={card.id}
                  x={card.xCoordinate}
                  y={card.yCoordinate}
                  style={{ zIndex: card.id, position: 'absolute' }}
                  onPress={onPress}
                  updateCard={this.handleLocationUpdate}
                >
                  <TextInput
                    editable={card.editable}
                    onEndEditing={onEdit}
                    disableFullscreenUI={true}
                    ref={`textInput${card.id}`}
                    placeholder={card.type}
                    value={card.text}
                    onChangeText={text => this.handleTextChange(card.id, text)}
                    style={{ ...card.style, minWidth: 50 }}
                    underlineColorAndroid={'transparent'}
                    zIndex={card.id}
                  />
                  <View>
                    <StylingMenu
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onPress={onPress}
                      menuOpen={card.menuOpen}
                      onStyleChange={onStyleChange}
                      style={card.style}
                      zIndex={card.id}
                    />
                  </View>
                </Draggable>
              );
            })}
          {gifs.length > 0 &&
            gifs.map(gif => {
              const onGifPress = () => this.handleGifPress(gif.id);
              const onGifDelete = () => this.handleGifDelete(gif.id);
              return (
                <Draggable
                  key={gif.id}
                  id={gif.id}
                  x={gif.xCoordinate}
                  y={gif.yCoordinate}
                  style={{ position: 'absolute' }}
                  onPress={onGifPress}
                  updateCard={this.handleGifLocationUpdate}
                >
                  <Image source={GIFList[gif.gif]} style={styles.gif} />
                  <View>
                    <DeleteMenu
                      onDelete={onGifDelete}
                      menuOpen={gif.menuOpen}
                      onPress={onGifPress}
                    />
                  </View>
                </Draggable>
              );
            })}
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexWrap: 'wrap'
  },
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
  }
});
