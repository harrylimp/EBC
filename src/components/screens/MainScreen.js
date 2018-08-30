import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator, createDrawerNavigator } from 'react-navigation';
import Hamburger from 'react-native-hamburger';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import ControlButtons from '../buttons/ControlButtons';
import IconButton from '../buttons/IconButton';
import NavigatedScreen from './NavigatedScreen';
import Draggable from '../card/Draggable';
import NfcManager, { NdefParser } from 'react-native-nfc-manager';
import ndef from '../../ndef';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hamburgerActive: false,
      open: false,
      enabled: false,
      supported: false
    };
  }

  componentDidMount() {
    this.getAsync();
    this.startNFC();
  }

  componentWillUnmount() {
    this.stopNFC();
  }

  startNFC = async () => {
    await this.launchNFC();
    await this.startDetection();
    await this.startWriting();
  };

  stopNFC = () => {
    this.stopDetection();
    this.stopWriting();
    this.turnOfNFC();
  };

  launchNFC = async () => {
    // Starting NFC Manager if it is supported
    await NfcManager.isSupported().then(supported => {
      NfcManager.start()
        .then(result => {
          console.log('Start OK', result);
        })
        .catch(result => {
          console.log('ERROR STARTING WITH NFC MANAGER');
        });
    });

    // Start detecting NFC tags automatically
    NfcManager.getLaunchTagEvent().then(tag => {
      // This returns the tag that launches the app
      console.log('The tag for NFC is: ', tag);
    });
  };

  startDetection = async () => {
    NfcManager.registerTagEvent(tag => {
      let tagText = this.parseText(tag);
      const tagJSONObject = JSON.parse(tagText);
      console.log('json', tagJSONObject);
      AsyncStorage.setItem('testNFC', tagText);
    }).then(() => {
      console.log('Called once the tag is discovered?');
    });
  };

  startWriting = async () => {
    const card = await AsyncStorage.getItem('myCard');
    const cardInText = JSON.stringify(card);
    console.log('The card', card);
    console.log('The card text', cardInText);
    let bytes = this.buildTextPayload(cardInText);
    console.log('The card bytes', bytes);

    NfcManager.setNdefPushMessage(bytes)
      .then(() => console.log('Ready to Beam'))
      .catch(err => console.log('Not ready to beam', err));
  };

  stopDetection = () => {
    NfcManager.stop()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  stopWriting = () => {
    NfcManager.setNdefPushMessage(null)
      .then(() => console.log('Cancelling Beam'))
      .catch(err => console.log(err));
  };

  goToNFCSetting = () => {
    NfcManager.goToNfcSetting()
      .then(result => {
        console.log('Going to NFC Setting GOOD', result); // result does nothing
      })
      .catch(error => {
        console.log('Go TO NFC FAILED', error);
      });
  };

  buildTextPayload = valueToWrite => {
    const message = [ndef.textRecord(valueToWrite)];
    const bytes = ndef.encodeMessage(message);
    return bytes;
  };

  parseText = tag => {
    if (tag.ndefMessage) {
      return NdefParser.parseText(tag.ndefMessage[0]);
    }

    return null;
  };

  strToBytes(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
      result.push(str.charCodeAt(i));
    }

    console.log('My bytes: ', result);

    return result;
  }

  getAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('UserInformation');
      value = JSON.parse(value);

      const card = {
        cards: [
          {
            id: 0,
            yCoordinate: 136.7529067993164,
            type: 'name',
            text: 'Charles',
            more: 'Text',
            andMore: 'field',
            xCoordinate: 223.20837402343755
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
      };
      await AsyncStorage.setItem('myCard', JSON.stringify(card));

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
    const rightButton = { onPress: Actions.userProfileScreen, icon: { name: 'person' } };

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
