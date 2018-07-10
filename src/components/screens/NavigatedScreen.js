import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import CardCarousel from '../carousel/CardCarousel';
import CircularButton from '../buttons/CircularButton';
import ControlButtons from '../buttons/ControlButtons';
import IconButton from '../buttons/IconButton';

export default class NavigatedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    hamburgerActive: false,
    open: false,
    }
  };
  render() {
    const leftButton = {icon: {name: 'adb'}};

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={ styles.header }>
            <IconButton icon={{ name: 'arrow-drop-up' }} />
            <TextInput style={ styles.textInput }/>
            {this.state.hamburgerActive ?
                <IconButton icon={{ name: 'close' }} onPress= { this.handleHamburger } /> :
                <IconButton icon={{ name: 'menu' }} onPress={ this.handleHamburger } />
            }
          </View>
          <CardCarousel style={styles.main}/>
        </View>
        <View style={styles.footer}>
          <IconButton icon={{ name: 'home' }} onPress={ Actions.pop }/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#091113',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#091113',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  main: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 15,
  },
  textInput: {
    backgroundColor: 'white',
    flex: 1,
    height: 40,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});
