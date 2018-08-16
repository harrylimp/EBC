import React from 'react';
import { View, Text } from 'react-native';

const UserDetailSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>
                {props.label}
            </Text>
            <Text style={styles.textStyle}>
                {props.text}
            </Text>
            <View style={styles.horizontalLineStyle} />
        </View>
    );
};

const styles = {
    containerStyle: {
        /*
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
        */
        //borderWidth: 2,
        //borderRadius: 3,
        //borderColor: 'black',
        //marginTop: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingLeft: 10,
        //backgroundColor: '#efe'
    },
    labelStyle: {
        fontSize: 12,
        color: 'white'
    },
    textStyle: {
        fontSize: 16,
        color: 'white'
    }, 
    horizontalLineStyle: {
        marginTop: 10,
        borderBottomColor: 'green',
        borderBottomWidth: 1,
    }
};

export default UserDetailSection;
