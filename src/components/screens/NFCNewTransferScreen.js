import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

class NFCNewTransferScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test'
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
}

const styles = {
  textStyle: {
    fontSize: 22
  },
  buttonWrapper: {
    margin: 10
  }
};

export default NFCNewTransferScreen;
