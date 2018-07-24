import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import TestNFC from '../sampleNFC/testNFC';

class LoginScreen extends Component {
    componentWillMount() {
        
    }

    render() {
        return (
            <View>
                <Text style={styles.loginFormStyle}>HELLLLO</Text>
                <TestNFC />
            </View>
        );
    }
}

const styles = {
    loginFormStyle: {
        fontSize: 30,
        marginTop: 25,
        color: '#ae1f4e'
    }
}

export default LoginScreen;