import React, { Component } from 'react';
import { AsyncStorage, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import UserDetail from '../userProfile/UserDetail';

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state  = {
            userInformation: {
                name: 'Harry Lim',
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
            <ScrollView contentContainerStyle={styles.test}>
                <Image
                    style={styles.imageStyle}
                    source={require('../../images/test.jpg')}
                />
                <TouchableOpacity onPress={this.onViewCardPress} style={styles.viewCardButtonStyle}>
                    <Text style={styles.viewCardTextStyle}>
                        View Cards
                    </Text>
                </TouchableOpacity> 
                <UserDetail
                    details={this.state.userInformation}
                />
            </ScrollView>
        );
    }
}

const styles = {
    test: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#091113'
    },
    imageStyle: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderColor: '#ede',
        borderWidth: 5,
        marginTop: 25
    },
    viewCardButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderColor: '#1a1a1e',
        borderWidth: 2,
        backgroundColor: 'gray',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 10
    },
    viewCardTextStyle: {
        fontSize: 20,
        color: 'white'
    }
}

export default UserProfileScreen;
