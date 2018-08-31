import React from 'react';
import { View, Text } from 'react-native';

const UserDetailSection = props => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{props.label}</Text>
      <Text style={styles.textStyle}>{props.text}</Text>
      <View style={styles.horizontalLineStyle} />
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 5
  },
  labelStyle: {
    fontSize: 12,
    color: 'white'
  },
  textStyle: {
    height: 22,
    fontSize: 18,
    color: 'white'
  },
  horizontalLineStyle: {
    borderBottomColor: '#32CD32',
    borderBottomWidth: 1,
    marginTop: 5
  }
};

export default UserDetailSection;
