import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import css from './styles.js';

const CircularButton = ({ children, icon, onPress }) => {
  // console.log(styles);
  const styledIcon = Object.assign({style: css.centerIcon }, icon);
  return <Button
      icon={
       styledIcon
      }
      onPress={ onPress }
      buttonStyle={ css.circularButton }
<<<<<<< HEAD
    />
=======
  />
>>>>>>> master
}

export default CircularButton;



