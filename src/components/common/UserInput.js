import React from 'react';
import { TextInput, View, Text } from 'react-native';

const UserInput = ({ label, value, onChangeText, placeHolder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeHolder={placeHolder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#efe',
    borderColor: '#eee',
    borderBottomWidth: 2,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 22,
    flex: 1
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 5,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default UserInput;
