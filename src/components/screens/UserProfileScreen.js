import React, { Component } from 'react';
import { AsyncStorage, View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import UserDetail from '../userProfile/UserDetail';

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state  = {
            userInformation: {
                name: 'Harry',
                companyName: 'Atlassian',
                occupation: 'Software Developer',
                email: 'hlim448@aucklanduni.ac.nz',
                phoneNumber: '0211097670',
                address: '58B Corunna Road',
                companyLogo: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                website: 'www.google.com',
                password: '12345'
            }
        };
    }

    willComponentMount() {
        // Normally this section of code would be called
        //const userInformation = this.getUserInformation();
        //this.setState({ userInformation: userInformation });

    }

    onUserEditPress() {

    }

    onViewCardPress() {
        console.log('Pressed View Cards');
        Actions.mainScreen();
    }

    getUserInformation = async() => {
        try {
            const value = await AsyncStorage.getItem('UserInformation');
            value = JSON.parse(value);
    
            if (value !== null) {
                console.log(value);
            }

            return value;
        } catch (error) {
            console.log("Error retrieving data");
        }
    }

    render() {
        return (
            <View style={styles.userProfileContainerStyle}>
                <Image
                    style={styles.userProfileImageStyle} 
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
                <TouchableOpacity onPress={this.onViewCardPress} style={styles.viewCardButton}>
                    <Text style={styles.viewCardText}>
                        View Cards
                    </Text>
                </TouchableOpacity> 
                <UserDetail
                    details={this.state.userInformation}
                />
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
        backgroundColor: '#091113',
        padding: 10,
        flex: 1
    },
    userNameTextStyle: {
        fontSize: 24,
        color: '#eee'
    },
    viewCardButton: {
        marginTop: 15,
        marginBottom: 15,
        padding: 15,
        flex: 1,
        backgroundColor: '#fa2'
    },
    viewCardText: {
        color: '#ded',
        fontSize: 24
    }
}

export default UserProfileScreen;
