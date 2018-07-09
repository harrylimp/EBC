import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';


import css from './styles.js';

const IconButton = ({ children, icon, onPress }) => {
  // console.log(styles);
  const styledIcon = Object.assign({style: css.centerIcon }, icon);
  return <Button
      icon={
       styledIcon
      }
      onPress={ onPress }
      buttonStyle = { css.iconButton }
    />
}

export default IconButton;



