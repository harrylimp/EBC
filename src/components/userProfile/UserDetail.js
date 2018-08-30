import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import UserDetailSection from './UserDetailSection';

class UserDetail extends Component {
  constructor(props) {
    super(props);
  }

  onEditText() {
    // This is responsible for updating the Asynchronous Storage if a user changes their detail
  }

  filterDetails() {
    console.log('Initial Details: ', this.props.details);

    let finalDetails = {
      Name: this.props.details['name'],
      Company: this.props.details['companyName'],
      Occupation: this.props.details['occupation'],
      'Email Address': this.props.details['email'],
      'Phone Number': this.props.details['phoneNumber']
    };

    console.log('Final Details: ', finalDetails);

    return finalDetails;
  }

  renderUserSections() {
    const finalDetails = this.filterDetails();
    const labels = Object.keys(finalDetails);
    // This first initialisation of the userSection is the title "About Me" or whatever
    console.log(labels);
    return labels.map(label => (
      <UserDetailSection key={label} label={label} text={finalDetails[label]} />
    ));
  }

  render() {
    return <View style={styles.userDetailComponentStyle}>{this.renderUserSections()}</View>;
  }
}

const styles = {
  userDetailComponentStyle: {
    backgroundColor: '#121111',
    borderRadius: 8,
    borderColor: 'transparent',
    borderWidth: 2
  }
};

export default UserDetail;
