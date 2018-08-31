import React, { Component } from 'react';
import { AsyncStorage, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import UserDetail from '../userProfile/UserDetail';

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInformation: {
        name: '',
        companyName: '',
        occupation: '',
        email: '',
        phoneNumber: '',
        address: '',
        companyLogo: '',
        website: ''
      }
    };

    this.setUserInformation();
  }

  componentWillMount() {
    this.setUserInformation();
  }

  setUserInformation = async () => {
    const user = await this.getUserInformation();

    this.setState({
      userInformation: {
        name: user.name,
        companyName: user.companyName,
        occupation: user.occupation,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        companyLogo: user.companyLogo,
        website: user.website
      }
    });
  };

  onViewCardPress() {
    console.log('Pressed View Cards');
    Actions.cardCreator();
  }

  getUserInformation = async () => {
    try {
      const value = await AsyncStorage.getItem('UserInformation');
      return JSON.parse(value);
    } catch (error) {
      console.log('Error retrieving data');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#091113' }}>
        <View style={styles.userImageStyle}>
          <Image style={styles.imageStyle} source={require('../../Icons/user_profile.gif')} />
          <View style={styles.userTextStyle}>
            <Text style={styles.textNameStyle}>{this.state.userInformation.name}</Text>
            <Text style={styles.textOccupationStyle}>{this.state.userInformation.occupation}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.onViewCardPress} style={styles.viewCardButtonStyle}>
          <Text style={styles.viewCardTextStyle}>View Cards</Text>
        </TouchableOpacity>
        <View style={styles.contactInformationContainerStyle}>
          <Text style={styles.contactInformationStyle}>Contact Information</Text>
        </View>
        <ScrollView style={{ marginLeft: 12, marginRight: 12 }}>
          <UserDetail details={this.state.userInformation} />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  userImageStyle: {
    flexDirection: 'row',
    marginTop: 25
  },
  imageStyle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: '#141B41',
    borderWidth: 2,
    marginTop: 25,
    marginLeft: 25
  },
  userTextStyle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
    height: 250
  },
  textNameStyle: {
    fontSize: 20,
    color: 'white'
  },
  textOccupationStyle: {
    fontSize: 16,
    color: 'white'
  },
  viewCardButtonStyle: {
    width: '96%',
    height: 50,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 5,
    opacity: 0.85
  },
  viewCardTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  contactInformationContainerStyle: {
    height: 40,
    width: '100%',
    backgroundColor: '#091113',
    marginTop: 30,
    paddingTop: 8,
    paddingLeft: 17,
    opacity: 0.85
  },
  contactInformationStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
};

export default UserProfileScreen;
