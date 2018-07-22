import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView,
} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import Draggable from '../card/Draggable';
import IconButton from '../buttons/IconButton';

export default class CardCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      open: false,
      currentText: '',
    }
  };

  addDraggable = (type) => {
    const cards = this.state.cards.slice();

    cards.push({
      id: this.state.cards.length,
      xCoordinate: 0,
      yCoordinate: 0,
      type: type,
      text: 'what',
      editable: false,
      menuOpen: false,
    });
    this.setState({ cards: cards, open: !this.state.open })
  }

  handleToggleMenu = () => {
    this.setState({
      open: !this.state.open,
    })
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
    updatedCards[id] = Object.assign(updatedCards[id], {editable: !updatedCards[id].editable, text: this.state.currentText});
    this.setState({
      cards: updatedCards,
      currentText: '',
    });
    console.log('cards', updatedCards[id]);
  }

  handleTextChange = (text) => {
    this.setState({
      currentText: text,
    })
  }

  render() {
    const { cards } = this.state;

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
    )

    return(
      <SideMenu
          isOpen={this.state.open}
          menu={SubMenu}
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

              return (
                  <Draggable
                    key={card.id}
                    x={card.xCoordinate}
                    y={card.yCoordinate}
                    style={ styles.draggable }
                    onPress={onPress}
                  >
                    <TextInput 
                      editable={card.editable}
                      onEndEditing={onEdit}
                      disableFullscreenUI={true}
                      placeholder={card.type}
                      onChangeText={(text) => this.handleTextChange(text)}
                    />
                    <View>
                      <Menu
                        opened={ card.menuOpen }
                        onBackdropPress={ onPress }
                      >          
                        <MenuTrigger />
                        <MenuOptions>
                          <MenuOption onSelect={ onEdit } text='Edit' />
                          <MenuOption onSelect={() => alert(`Delete`)} >
                            <Text style={{color: 'red'}}>Delete</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                        </MenuOptions>
                      </Menu>
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
  }
});
