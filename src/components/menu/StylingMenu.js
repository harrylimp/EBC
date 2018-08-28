import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { MenuOptions, MenuOption, Menu, MenuTrigger, renderers } from 'react-native-popup-menu';
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';
import { List, ListItem } from 'react-native-elements';

import IconButton from '../buttons/IconButton';

export default class StylingMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: 'basic',
      color: tinycolor(props.style.color).toHsl(),
      fontSize: props.style.fontSize,
      fontFamily: props.style.fontFamily
    };
  }

  updateHue = h =>
    this.setState({ color: { ...this.state.color, h } }, () =>
      this.props.onStyleChange({
        fontSize: this.state.fontSize,
        fontFamily: this.state.fontFamily,
        color: `#${tinycolor(this.state.color).toHex8()}`
      })
    );

  updateSaturation = s =>
    this.setState({ color: { ...this.state.color, s } }, () =>
      this.props.onStyleChange({
        fontSize: this.state.fontSize,
        fontFamily: this.state.fontFamily,
        color: `#${tinycolor(this.state.color).toHex8()}`
      })
    );

  updateLightness = l =>
    this.setState({ color: { ...this.state.color, l } }, () =>
      this.props.onStyleChange({
        fontSize: this.state.fontSize,
        fontFamily: this.state.fontFamily,
        color: `#${tinycolor(this.state.color).toHex8()}`
      })
    );

  updateFontSize = size =>
    this.setState({ fontSize: size }, () =>
      this.props.onStyleChange({
        fontSize: this.state.fontSize,
        fontFamily: this.state.fontFamily,
        color: `#${tinycolor(this.state.color).toHex8()}`
      })
    );

  updateFontFamily = font =>
    this.setState({ fontFamily: font }, () =>
      this.props.onStyleChange({
        fontSize: this.state.fontSize,
        fontFamily: this.state.fontFamily,
        color: `#${tinycolor(this.state.color).toHex8()}`
      })
    );

  handleMenuEdit = menu => {
    this.setState({
      menu: menu
    });
  };

  updateMenu = menu => this.setState({ menu: menu });

  backdropPress = onPress => {
    this.setState({ menu: 'basic' });
    onPress();
  };

  render() {
    const { Popover } = renderers;
    const { basicMenu } = this.state;
    const { onEdit, onDelete, onPress, menuOpen, onStyleChange } = this.props;

    const cardMenu = (onEdit, onDelete) => (
      <MenuOptions style={styles.miniMenuOption}>
        <MenuOption>
          <IconButton
            icon={{ name: 'mode-edit' }}
            onPress={() => this.handleMenuEdit('edit')}
            size={'small'}
          />
        </MenuOption>
        <MenuOption>
          <IconButton icon={{ name: 'delete' }} onPress={onDelete} size={'small'} />
        </MenuOption>
      </MenuOptions>
    );

    const edittingMenu = () => (
      <MenuOptions style={styles.miniMenuOption}>
        <MenuOption>
          <IconButton icon={{ name: 'keyboard' }} onPress={onEdit} size={'small'} />
        </MenuOption>
        <MenuOption>
          <IconButton
            icon={{ name: 'text-format' }}
            onPress={() => this.handleMenuEdit('font')}
            size={'small'}
          />
        </MenuOption>
        <MenuOption>
          <IconButton
            icon={{ name: 'format-color-text' }}
            onPress={() => this.handleMenuEdit('color')}
            size={'small'}
          />
        </MenuOption>
        <MenuOption>
          <IconButton
            icon={{ name: 'text-fields' }}
            onPress={() => this.handleMenuEdit('sizing')}
            size={'small'}
          />
        </MenuOption>
      </MenuOptions>
    );

    const colorSlide = () => (
      <MenuOptions style={styles.miniMenuOption}>
        <MenuOption>
          <HueSlider
            style={styles.sliderRow}
            gradientSteps={40}
            value={this.state.color.h}
            onValueChange={this.updateHue}
          />
          <SaturationSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={this.state.color.s}
            color={this.state.color}
            onValueChange={this.updateSaturation}
          />
          <LightnessSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={this.state.color.l}
            color={this.state.color}
            onValueChange={this.updateLightness}
          />
        </MenuOption>
      </MenuOptions>
    );

    const fontSizes = [8, 10, 12, 16, 20, 24];

    const sizeUpdate = () => (
      <MenuOptions style={styles.miniMenuOption}>
        {fontSizes.map(size => (
          <MenuOption key={size} onSelect={() => this.updateFontSize(size)}>
            <Text style={styles.dropdownTextStyle}> {size} </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    );

    const fontTypes = ['notoserif', 'sans-serif-light', 'sans-serif'];

    const fontUpdate = () => (
      <MenuOptions style={styles.miniFontOption}>
        {fontTypes.map(font => (
          <MenuOption
            key={font}
            style={styles.dropDownStyle}
            onSelect={() => this.updateFontFamily(font)}
          >
            <Text
              style={{
                fontFamily: font,
                color: 'white',
                textAlign: 'center'
              }}
            >
              {font}
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    );

    const menuSelector = () => {
      switch (this.state.menu) {
        case 'edit':
          return edittingMenu();
        case 'color':
          return colorSlide();
        case 'sizing':
          return sizeUpdate();
        case 'font':
          return fontUpdate();
        default:
          return cardMenu(onEdit, onDelete);
      }
    };

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
        {menuSelector()}
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
  sliderRow: {
    alignSelf: 'stretch',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    width: 200
  },
  pickerStyle: {
    width: 200,
    height: 120
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
