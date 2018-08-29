import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            name: 'Harry Lim'
        };
    }

    render() {
        return (
            <View style={styles.userProfileContainerStyle}>
                <Image
                    style={styles.userProfileImageStyle} 
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
                <Text style={styles.userNameTextStyle}>
                    This is the user profile UserProfileScreen
                </Text>
            </View>
        );
    }
}

const styles = {
    userProfileImageStyle: {
        height: 100,
        width: 100
    },
    userProfileContainerStyle: {
        backgroundColor: '#ede',
        padding: 10,
        flex: 1
    },
    userNameTextStyle: {
        fontSize: 24,
        fontColor: '#fe14a2'
    }
}

export default UserProfileScreen;
