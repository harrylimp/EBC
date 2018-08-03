import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

class WelcomeScreen extends Component {
    render() {
        return (
            <View>
                <Image
                    style={styles.image} 
                    source={{uri: '../../images/UoA_GIF.gif'}}/>
            </View>
        )
    }
}

const styles = {
    image: {
        width: 150,
        height: 150
    }
}

export default WelcomeScreen;
