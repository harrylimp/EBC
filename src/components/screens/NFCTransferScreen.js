import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NfcManager, { NdefParser } from 'react-native-nfc-manager';

function strToBytes(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }

  return result;
}

function buildUrlPayload(valueToWrite) {
  const urlBytes = strToBytes(valueToWrite);
  const headerBytes = [0xd1, 0x01, urlBytes.length + 1, 0x55, 0x03];

  return [...headerBytes, ...urlBytes];
}

function buildTextPayload(valueToWrite) {
  const textBytes = strToBytes(valueToWrite);
  // in this example. we always use `en`
  const headerBytes = [0xd1, 0x01, textBytes.length + 3, 0x54, 0x02, 0x65, 0x6e];

  return [...headerBytes, ...textBytes];
}

class NFCTransferScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: true,
      enabled: false,
      tag: {},
      currentAction: 'SKUX'
    };
  }

  componentDidMount() {
    NfcManager.isSupported().then(supported => {
      //this.setState({ supported });
      console.log('IS SUPPORTED?', supported);
      NfcManager.start()
        .then(result => {
          console.log('Start OK', result);
        })
        .catch(result => {
          console.log('YOLO ERROR');
        });
    });

    NfcManager.onStateChanged(event => {
      if (event.state === 'on') {
        console.log('NFC STATE CHANGED TO ON');
      } else if (event.state === 'off') {
        console.log('NFC STATE CHANGED TO OFF');
      } else if (event.state === 'turning_on') {
        console.log('NFC STATE CHANGED TO TURNING ON');
      } else if (event.state === 'turning_off') {
        console.log('NFC STATE CHANGED TO TURNING OFF');
      }
    })
      .then(sub => {
        this._stateChangedSub = sub;
        console.log('not really sure what goes on here');
      })
      .catch(err => {
        console.warn(err);
      });
  }

  componentWillUnmount() {
    NfcManager.stop();
  }

  onNFCEnablePress = () => {
    NfcManager.isEnabled().then(result => {
      console.log('Enabled: ', result);
    });

    NfcManager.getLaunchTagEvent().then(tag => {
      // This returns the tag that launches the app
      console.log('The tag for NFC is: ', tag);
    });
  };

  goToNFCSetting = () => {
    NfcManager.goToNfcSetting()
      .then(result => {
        console.log('Going to NFC Setting GOOD', result); // result does nothing
      })
      .catch(error => {
        console.log('GoTONFCFAILED', error);
      });
  };

  startDetection = () => {
    NfcManager.registerTagEvent(tag => {
      console.log('Tag Discovered: ', tag);

      let text = this.parseUri(tag);
      console.log(text);
      this.setState({ currentAction: text });
    }).then(() => {
      console.log('Called once the tag is discovered?');
    });
  };

  writeNDEF = () => {
    console.log('Lets start writing shall we');

    const text = 'Test Data';

    let bytes = buildTextPayload(text);

    NfcManager.requestNdefWrite(bytes)
      .then(() => console.log('It actually wrote!!!'))
      .catch(err => consolelog('Error with the writing', err));
  };

  _requestNdefWrite = () => {
    let { isWriting, urlToWrite, rtdType } = this.state;
    if (isWriting) {
      return;
    }

    let bytes;

    if (rtdType === RtdType.URL) {
      bytes = buildUrlPayload(urlToWrite);
    } else if (rtdType === RtdType.TEXT) {
      bytes = buildTextPayload(urlToWrite);
    }

    this.setState({ isWriting: true });
    NfcManager.requestNdefWrite(bytes)
      .then(() => console.log('write completed'))
      .catch(err => console.warn(err))
      .then(() => this.setState({ isWriting: false }));
  };

  render() {
    return (
      <View>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={this.onNFCEnablePress}
            title="Turn on NFC"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.goToNFCSetting}
            title="Go To NFC Setting"
            color="#FEA1A2"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.startDetection}
            title="Stop Detection"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => console.log('Pressed')}
            title="Display Latest Tag"
            color="#FEA1A2"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <Text style={styles.textStyle}>{this.state.currentAction}</Text>
      </View>
    );
  }

  parseUri = tag => {
    if (tag.ndefMessage) {
      console.log('is ndef message');
      let result = NdefParser.parseUri(tag.ndefMessage[0]),
        uri = result && result.uri;
      if (uri) {
        console.log('parseUri: ' + uri);
        return uri;
      }
    }
    return null;
  };

  parseText = tag => {
    if (tag.ndefMessage) {
      console.log('is ndef message');
      return NdefParser.parseText(tag.ndefMessage[0]);
    }
    return null;
  };
}

const styles = {
  textStyle: {
    fontSize: 22
  },
  buttonWrapper: {
    margin: 10
  }
};

export default NFCTransferScreen;
