import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';


import css from './styles.js';


const IconButton = ({ children, icon, onPress, black, size }) => {
  const iconStyle = black ? css.blackStyle : css.iconStyle;

  let iconSize;
  let buttonStyle;

  switch(size) {
    case 'small':
      buttonStyle = styles.small;
      iconSize = 15;
      break;
    default:
      buttonStyle = styles.medium;
      iconSize = 30;
      break;
  }

  const styledIcon = Object.assign({style: iconStyle, size:iconSize }, icon);
  return <Button
      icon={
       styledIcon
      }
      onPress={ onPress }
      buttonStyle = { buttonStyle }
    />
}

const styles = StyleSheet.create({

  medium: {
    height: 60,
    width: 60,
    backgroundColor: 'transparent',
  },
  small: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
  }

})

export default IconButton;

