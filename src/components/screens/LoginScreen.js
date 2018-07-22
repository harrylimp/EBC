import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

class LoginScreen extends Component {
    render() {
        return (
            <View>
                <Text>Hey</Text>
            </View>
        );
    }
}

const styles = {
    loginFormStyle: {
        fontSize: 18,
        marginTop: 25,
        fontColor: '#efe'
    }
}

export default LoginScreen;