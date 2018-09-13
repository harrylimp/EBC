import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Logo from '../../Icons/logo';

class GetStartedScreen extends Component {
  componentWillMount() {
    console.disableYellowBox = true;
  }

  onGetStartedButtonPress() {
    Actions.welcomeScreen();
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.logoContainer}>
          <Logo size={'large'} />
        </View>
        <TouchableOpacity
          onPress={this.onGetStartedButtonPress}
          style={styles.getStartedButtonStyle}
        >
          <Text style={styles.getStartedTextStyle}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  screenContainer: {
    backgroundColor: '#091113',
    flex: 1,
    paddingTop: 100
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  getStartedButtonStyle: {
    backgroundColor: '#efefef',
    width: 150,
    marginLeft: 105,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#dedede',
    borderWidth: 1
  },
  getStartedTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default GetStartedScreen;
