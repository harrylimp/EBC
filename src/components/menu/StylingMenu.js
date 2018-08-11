import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { MenuOptions, MenuOption, Menu, MenuTrigger, renderers } from 'react-native-popup-menu';

import IconButton from '../buttons/IconButton';

export default class StylingMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basicMenu: true,
    }
  };

  handleToggleEdit = () => {
    this.setState({
      basicMenu: false,
    })
  }

  backdropPress = (onPress) => {
    this.setState({ basicMenu: true })
    onPress();
  }

  render() {
    const { Popover } = renderers;
    const { basicMenu } = this.state;
    const { onEdit, onDelete, onPress, menuOpen } = this.props;

    const cardMenu = (onEdit, onDelete) => (
      <MenuOptions style={ styles.miniMenuOption }>
        <MenuOption >
          <IconButton
            icon={{name: 'mode-edit'}}
            onPress={ this.handleToggleEdit }
            size={ 'small' }
          />
        </MenuOption>
        <MenuOption>
          <IconButton
            icon={{name: 'delete'}}
            onPress={ onDelete }
            size={ 'small' }
          />
        </MenuOption>
      </MenuOptions>
    )

    const edittingMenu = () => (
      <MenuOptions style={ styles.miniMenuOption }>
        <MenuOption>
          <IconButton
            icon={{name: 'keyboard'}}
            onPress={ onEdit }
            size={ 'small' }
          />
        </MenuOption>
        <MenuOption>
          <IconButton
            icon={{name: 'text-format'}}
            onPress={ () => alert(`Delete`)}
            size={ 'small' }
          />
        </MenuOption>
        <MenuOption>
          <IconButton
            icon={{name: 'format-color-text'}}
            onPress={ () => alert(`Delete`)}
            size={ 'small' }
          />
        </MenuOption>
        <MenuOption>
          <IconButton
            icon={{name: 'text-fields'}}
            onPress={ () => alert(`Delete`)}
            size={ 'small' }
          />
        </MenuOption>
      </MenuOptions>
    )

    const onBackdropPress = () => this.backdropPress(onPress);

    return(
      <Menu
        renderer={Popover}
        rendererProps={{ preferredPlacement: 'bottom', customStyle: styles.miniMenuOption , anchorStyle: styles.anchorStyle }}
        opened={ menuOpen }
        onBackdropPress={ onBackdropPress }
        style={{borderRadius: 20}}
      >          
        <MenuTrigger />
        {basicMenu ? cardMenu(onEdit,onDelete) : edittingMenu()}
      </Menu>
    )
  }
}

const styles = StyleSheet.create({
  miniMenuOption: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  anchorStyle: {
    backgroundColor: 'grey',
  },
})