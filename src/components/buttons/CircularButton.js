import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import css from './styles.js';

const CircularButton = ({ children, icon }) => {
  // console.log(styles);
  const styledIcon = Object.assign({style: css.centerIcon }, icon);
  return <View>
    <Button
      icon={
       styledIcon
      }
      buttonStyle={ css.circularButton }
    />
  </View>
}

export default CircularButton;



