import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NfcManager, { NdefParser } from 'react-native-nfc-manager';
import ndef from 'ndef';

function strToBytes(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }

  console.log('These are the bytes: ', result);

  return result;
}

function buildUrlPayload(valueToWrite) {
  const urlBytes = strToBytes(valueToWrite);
  const headerBytes = [0xd1, 0x01, urlBytes.length + 1, 0x55, 0x03];

  return [...headerBytes, ...urlBytes];
}

function buildTextPayload(valueToWrite) {
  // const textBytes = strToBytes(valueToWrite);
  // // in this example. we always use `en`
  // const headerBytes = [0xd1, 0x01, textBytes.length + 3, 0x54, 0x02, 0x65, 0x6e];

  // return [...headerBytes, ...textBytes];
  const message = [ndef.textRecord('hello, world')];

  const bytes = ndef.encodeMessage(message);

  return bytes;
  // do something useful with bytes: write to a tag or send to a peer

  // records = ndef.decodeMessage(bytes);

  // ndef.text.decodePayload(records[0].payload);

  // prints 'hello, world'
}

class NFCTransferScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: true,
      enabled: false,
      tag: {},
      currentAction: 'NOTHING YET',
      text: ''
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

    // Listener that checks for state changes - not that necessary
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

  // Will have to call the shutdown method
  componentWillUnmount() {
    NfcManager.stop();
  }

  // This will all be done on load
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
        console.log('Go TO NFC FAILED', error);
      });
  };

  startDetection = () => {
    NfcManager.registerTagEvent(tag => {
      console.log('Tag Discovered: ', tag);

      let text = this.parseText(tag);
      console.log('text', text);
      const jsonObject = JSON.parse(text);
      console.log('json', jsonObject); // All works perfectly! Great!
      console.log('jsonText', jsonObject.value);
      this.setState({ currentAction: text });
    }).then(() => {
      console.log('Called once the tag is discovered?');
    });
  };

  // Not relevant asas
  startWriting = () => {
    const text = this.state.text;
    this.setState({ text: text });

    let bytes = buildTextPayload(text);

    NfcManager.requestNdefWrite(bytes)
      .then(() => console.log('It actually wrote!!!'))
      .catch(err => console.log('Error with the writing', err));
  };

  startWritingAndroidBeam = () => {
    const text = this.state.text;
    const jsonObject = {
      id: 'hello',
      value: 'value',
      text: text
    };

    const object = JSON.stringify(jsonObject);

    this.setState({ text: object });
    console.log('The current text will be: ', object);

    let bytes = buildTextPayload(object);

    NfcManager.setNdefPushMessage(bytes)
      .then(() => console.log('Ready to Beam'))
      .catch(err => console.log(err));
  };

  stopDetectionAndWriting = () => {
    // Can't cancel the write and android beam at the same time - you can only use one
    /// NfcManager.cancelNdefWrite();
    NfcManager.setNdefPushMessage(null)
      .then(() => console.log('Cancelling Beam'))
      .catch(err => console.log(err));
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
            onPress={this.startDetection}
            title="Start Detection"
            color="#8211E4"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.startWriting}
            title="Start Writing Normal"
            color="#FEA1A2"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.startWritingAndroidBeam}
            title="Start Writing Android BEAM"
            color="#EFCACA"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.stopDetectionAndWriting}
            title="Turn it all off"
            color="#8211E4"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.goToNFCSetting}
            title="Go To NFC Setting"
            color="#EF1A2A"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <TextInput
          style={{ height: 50, borderColor: 'gray', borderWidth: 2 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Text style={styles.textStyle}>{this.state.currentAction}</Text>
        <Text style={styles.textStyle}>{this.state.text}</Text>
      </View>
    );
  }

  parseUri = tag => {
    console.log('Parsing the tag', tag);
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
    console.log('Parsing the tag', tag);
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
