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

    renderUserSections() {
        const labels = Object.keys(this.props.details);
        // This first initialisation of the userSection is the title "About Me" or whatever
        const userSections = (
            <Text>JAAAAAAAAAAAAAAAAAAAAA</Text>
        );

        /*
        for (const label of labels) {
            const text = this.props.details[label];

            userSections += (
                <UserDetailSection
                    label={label}
                    text={text}
                />
            );
        }*/

        return userSections;
    }

    render() {
        return (
            <View>
                <UserDetailSection
                    label={this.props.details.address}
                    text={this.props.details.name}
                />
                {this.renderUserSections()}
            </View>
        );
    }
}

const styles = {
    textStyle: {
        color: '#efe',
        fontSize: 20,
        padding: 10
    }
}

export default UserDetail;
