import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator, createDrawerNavigator } from 'react-navigation';
import Hamburger from 'react-native-hamburger';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import ControlButtons from '../buttons/CircularButton';

import IconButton from '../buttons/IconButton';
import NavigatedScreen from './NavigatedScreen';
import SideMenu from '../common/SideMenu'

export default class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    hamburgerActive: false,
    open: false,
    }
  };

  handleHamburger = () => {
    console.log('hello', this.state.hamburgerActive);
    console.log('yeboi', this.state.open);
    this.setState({
      hamburgerActive: !this.state.hamburgerActive,
      open: !this.state.open,
    })
  }




  render() {
    const hamburgerIcon = { onPress: this.handleHamburger, icon:{ name: 'menu' } };
    const crossIcon = { onPress: this.handleHamburger, icon: { name:'times' } };

    return (
    <View>
      <View style={ styles.header }>
        {this.state.hamburgerActive ?
            <IconButton icon={{ name: 'close' }} onPress= { this.handleHamburger } /> :
            <IconButton icon={{ name: 'menu' }} onPress={ this.handleHamburger } />
        }
      </View>
      <View style={ styles.header }>
        <Menu
          opened={ this.state.open }
          onBackdropPress={ this.handleHamburger }
        >          
          <MenuTrigger />
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text='Save' />
            <MenuOption onSelect={() => alert(`Delete`)} >
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
          </MenuOptions>
        </Menu>
      </View>
    </View>
    );
  }
}
  

const styles = StyleSheet.create({
  container: {

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  navButton: {

  },
});