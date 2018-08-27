import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import UserDetailSection from './UserDetailSection';

class UserDetail extends Component {
    constructor(props) {
        super(props);
    }

    onEditText() {
        // This is responsible for updating the Asynchronous Storage if a user changes their detail
    }

    filterDetails() {
        console.log(this.props.details);

        let finalDetails = {
            name: this.props.details['name'],
            company: this.props.details['companyName'],
        };

        return finalDetails;
    }

    renderUserSections() {
        console.log(this.props.details);
        const labels = Object.keys(this.props.details);
        // This first initialisation of the userSection is the title "About Me" or whatever
        console.log(labels);
        return labels.map(label => 
            <UserDetailSection 
                key={label}
                label={label}
                text={this.props.details[label]}
            />
        );
    }

    render() {
        return (
            <View style={styles.userDetailComponentStyle}>
                <Text style={styles.contactInformationStyle}>Contact Information</Text>
                {this.renderUserSections()}
            </View>
        );
    }
}

const styles = {
    contactInformationStyle: {
        fontSize: 20,
        padding: 5,
        color: 'white',
        backgroundColor: 'gray',
        width: '100%'
    },
    userDetailComponentStyle: {
      //  backgroundColor: '#091113'
      borderTopWidth: 2,
      borderColor: '#1a1a1e',
      shadowColor: '#ddd',
      width: '100%'
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        padding: 10,
        width: '100%'
    }
}

export default UserDetail;
