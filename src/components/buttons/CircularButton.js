import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import css from './styles.js';

const CircularButton = ({ children, icon, onPress, nonTransparent }) => {
  // console.log(styles);
  const styledIcon = Object.assign({style: css.centerIcon, size:30 }, icon);
  return <Button
      icon={
       styledIcon
      }
      onPress={ onPress }
      buttonStyle={ nonTransparent ? [css.circularButton, css.color] : css.circularButton }
    />
}

export default CircularButton;



