import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { MenuOptions, MenuOption, Menu, MenuTrigger, renderers } from 'react-native-popup-menu';
import { List, ListItem } from 'react-native-elements';

import IconButton from '../buttons/IconButton';

export default class DeleteMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  backdropPress = onPress => {
    onPress();
  };

  render() {
    const { Popover } = renderers;
    const { onDelete, onPress, menuOpen } = this.props;

    const onBackdropPress = () => this.backdropPress(onPress);

    return (
      <Menu
        renderer={Popover}
        rendererProps={{
          preferredPlacement: 'bottom',
          customStyle: styles.miniMenuOption,
          anchorStyle: styles.anchorStyle
        }}
        opened={menuOpen}
        onBackdropPress={onBackdropPress}
        style={{ borderRadius: 20 }}
      >
        <MenuTrigger />
        <MenuOptions style={styles.miniMenuOption}>
          <MenuOption>
            <IconButton icon={{ name: 'delete' }} onPress={onDelete} size={'small'} />
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }
}

const styles = StyleSheet.create({
  miniMenuOption: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    justifyContent: 'space-around',
    borderRadius: 10
  },
  miniFontOption: {
    backgroundColor: 'grey',
    borderRadius: 10
  },
  anchorStyle: {
    backgroundColor: 'grey'
  },
  dropDownStyle: {
    width: 200,
    height: 30
  },
  dropdownTextStyle: {
    textAlign: 'center',
    color: 'white',
    margin: 10
  },
  textStyle: {
    backgroundColor: 'white',
    color: 'grey',
    textAlign: 'center'
  }
});
