import React from 'react';
import { Text, TouchableOpacity, TouchableHighlight } from 'react-native';

const GeneralButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableHighlight onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#eee',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff'
  }
};

export default GeneralButton;
