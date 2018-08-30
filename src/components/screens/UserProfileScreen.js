import React, { Component } from 'react';
import { AsyncStorage, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import UserDetail from '../userProfile/UserDetail';

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  filteredDetails() {
    return {
      NAME: 'Harry Lim',
      COMPANY: 'Atlassian',
      OCCUPATION: 'Software Dev',
      OCC: 'YOLO',
      CCCCC: 'GOOD',
      GIF: 'NICE',
      THOUGHT: 'NONE',
      COOL: 'NICEEE'
    };
  }

  onUserEditPress() {}

  onViewCardPress() {
    console.log('Pressed View Cards');
    Actions.mainScreen();
  }

  getUserInformation = async () => {
    try {
      const value = await AsyncStorage.getItem('UserInformation');
      value = JSON.parse(value);

      if (value !== null) {
        console.log(value);
      }

      return value;
    } catch (error) {
      console.log('Error retrieving data');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#091113' }}>
        <View style={styles.userImageStyle}>
          <Image style={styles.imageStyle} source={require('../../images/test.jpg')} />
          <View style={styles.userTextStyle}>
            <Text style={styles.textNameStyle}>{this.state.userInformation.name}</Text>
            <Text style={styles.textOccupationStyle}>{this.state.userInformation.occupation}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.onViewCardPress} style={styles.viewCardButtonStyle}>
          <Text style={styles.viewCardTextStyle}>View Cards</Text>
        </TouchableOpacity>
        <ScrollView>
          <UserDetail details={this.filteredDetails()} />
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
    borderWidth: 3,
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
    width: '100%',
    height: 50,
    backgroundColor: '#a0a083',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 5
  },
  viewCardTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  }
};

export default UserProfileScreen;
