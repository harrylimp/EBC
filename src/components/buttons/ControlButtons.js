import React from 'react';
import { View } from 'react-native';
import CircularButton from './CircularButton';
import css from './styles';

const ControlButtons = ({leftIcon, rightIcon}) => {

  return <View style={ css.controlButtons }>
      <CircularButton icon={leftIcon}/>
      <CircularButton icon={rightIcon}/>
    </View>
}

export default ControlButtons;