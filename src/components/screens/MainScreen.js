import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator, createDrawerNavigator } from 'react-navigation';
import Hamburger from 'react-native-hamburger';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import ControlButtons from '../buttons/ControlButtons';
import IconButton from '../buttons/IconButton';
import NavigatedScreen from './NavigatedScreen';
import Draggable from '../card/Draggable';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hamburgerActive: false,
      open: false
    };
  }

  componentWillMount() {
    this.getAsync();
  }

  getAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('UserInformation');
      value = JSON.parse(value);

      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
      console.log('Error retrieving data');
    }
  };

  handleHamburger = () => {
    this.setState({
      hamburgerActive: !this.state.hamburgerActive,
      open: !this.state.open
    });
  };

  render() {
    const leftButton = { onPress: Actions.navigatedScreen, icon: { name: 'account-box' } };
    const rightButton = { onPress: Actions.navigatedScreen, icon: { name: 'person' } };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.state.hamburgerActive ? (
            <IconButton icon={{ name: 'close' }} onPress={this.handleHamburger} />
          ) : (
            <IconButton icon={{ name: 'menu' }} onPress={this.handleHamburger} />
          )}
        </View>
        <View style={styles.navMenu}>
          <Menu opened={this.state.open} onBackdropPress={this.handleHamburger}>
            <MenuTrigger />
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text="Save" />
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text="Disabled" />
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.body}>
          <Image style={{ width: 150, height: 200 }} source={require('../../Icons/logo.png')} />
          <Text style={styles.welcome}>Share</Text>
        </View>
        <ControlButtons leftButton={leftButton} rightButton={rightButton} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#091113',
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#091113'
  },
  navMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#091113',
    marginRight: 20
  },
  body: {
    flex: 0.875,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  navButton: {}
});
