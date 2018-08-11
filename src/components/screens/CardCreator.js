import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage,
} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import Draggable from '../card/Draggable';
import IconButton from '../buttons/IconButton';
import StylingMenu from '../menu/StylingMenu';

export default class CardCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      open: false,
      currentText: '',
      test: 0,
    }
  };

  componentDidMount() {
    AsyncStorage.getItem("cards").then((result) => {
      const val = result == null ? [] : JSON.parse(result);
      this.setState({cards: val});
    }).catch((error) => {
      console.log('error is', error);
    });
  }

  save = async() => {
    let cards = this.state.cards;
    const goodFeels = await AsyncStorage.setItem('cards', JSON.stringify(cards));
  }

  addDraggable = (type) => {
    const cards = this.state.cards.slice();

    cards.push({
      id: this.state.cards.length,
      xCoordinate: 0,
      yCoordinate: 0,
      type: type,
      text: '',
      editable: false,
      menuOpen: false,
      style: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'normal',
      }
    });
    this.setState({ cards: cards, open: !this.state.open });
  }

  handleToggleMenu = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  handleCardPress = (id) => {
    const updatedCards = this.state.cards.slice();
    updatedCards[id] = Object.assign(updatedCards[id], {menuOpen: !updatedCards[id].menuOpen});
    this.setState({
      cards: updatedCards,
    })
  }

  handleEditPress = (id) => {
    const updatedCards = this.state.cards.slice();
    const editable = updatedCards[id].editable;
    const reference = `textInput${id}`;

    updatedCards[id] = Object.assign(updatedCards[id], {editable: !editable, menuOpen: false});
    this.setState({
      cards: updatedCards,
    });
    !editable && this.refs[reference].focus();
    editable && this.save();
  }

  handleTextChange = (id, text) => {
    const updatedCards = this.state.cards.slice();
    updatedCards[id] = Object.assign(updatedCards[id], { text: text });
    this.setState({
      cards: updatedCards,
    });
  }

  handleDelete = async(id) => {
    const updatedCards = this.state.cards.slice();
    updatedCards.splice(id, 1);
    this.setState({
      cards: updatedCards,
    })
    let cards = this.state.cards;
    const saving = await AsyncStorage.setItem('cards', JSON.stringify(cards));
  }

  handleLocationUpdate = async(updateInfo) => {
    const updateCards = this.state.cards.slice();
    updateCards[updateInfo.id] = Object.assign(updateCards[updateInfo.id], { xCoordinate: updateInfo.x, yCoordinate: updateInfo.y });
    this.setState({
      cards: updateCards,
    });
    console.log('what up though?');
    let cards = this.state.cards;
    const goodFeels = await AsyncStorage.setItem('cards', JSON.stringify(cards));
  }

  render() {
    const { cards } = this.state;
    const { Popover } = renderers;

    const SubMenu = (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
      <List containerStyle={{marginBottom: 20}}>
        <ListItem
          title={'Name'}
          onPress={ () => this.addDraggable('name') }
        />
        <ListItem
          title={'Email'}
          onPress={ () => this.addDraggable('email') }
        />
        <ListItem
          title={'Company'}
          onPress={ () => this.addDraggable('company') }
        />
      </List>
    </View>
    );

    return(
      <SideMenu
          isOpen={this.state.open}
          menu={SubMenu}
          onChange={ (isOpen) => !isOpen && this.handleToggleMenu() }
          disableGestures
          menuPosition={'right'}
          openMenuOffset={120}
      >
        <View style={styles.container}>
          <View style={ styles.footer } >
            <IconButton
              icon={{name: 'mode-edit'}}
              onPress={ this.handleToggleMenu }
              black
            />
          </View>
          {
            cards.map(card => {
              const onPress = () => this.handleCardPress(card.id);
              const onEdit = () => this.handleEditPress(card.id);
              const onSave = () => this.save();
              const onDelete = () => this.handleDelete(card.id);

              return (
                  <Draggable
                    key={card.id}
                    id={card.id}
                    x={card.xCoordinate}
                    y={card.yCoordinate} 
                    style={ styles.draggable }
                    onPress={ onPress }
                    updateCard={this.handleLocationUpdate}
                  >
                    <TextInput 
                      editable={card.editable}
                      onEndEditing={onEdit}
                      disableFullscreenUI={true}
                      ref={ `textInput${card.id}` }
                      placeholder={card.type}
                      value={card.text}
                      onChangeText={(text) => this.handleTextChange(card.id, text)}
                      style={card.style}
                      underlineColorAndroid={ 'transparent' }
                    />
                    <View>
                      <StylingMenu
                        onEdit={ onEdit }
                        onDelete={ onDelete }
                        onPress={ onPress }
                        menuOpen={ card.menuOpen }
                      />
                    </View>
                  </Draggable>
              )
            })
          }
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'brown',
  },
  draggable: {
    zIndex: 1,
  },
  textInput: {
    color: 'black',
  }
});
