import React from 'react';
import { View } from 'react-native';
import CircularButton from './CircularButton';
import css from './styles';

const ControlButtons = ({ leftButton, rightButton }) => {
  return (
    <View style={css.controlButtons}>
      <CircularButton icon={leftButton.icon} onPress={leftButton.onPress} />
      <CircularButton icon={rightButton.icon} onPress={rightButton.onPress} />
    </View>
  );
};

export default ControlButtons;
