import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated, TouchableOpacity } from 'react-native';

const AnimatedView = Animated.AnimatedView;

export default class CardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      x: props.x,
      y: props.y,
      pan: new Animated.ValueXY({ x: props.x, y: props.y })
    };
  }

  componentWillMount() {
    console.disableYellowBox = true;
    this._val = { x: this.state.x, y: this.state.y };
    this.state.pan.addListener(value => (this._val = value));
  }

  render() {
    const { children, style, onPress } = this.props;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    return (
      <Animated.View style={[panStyle, styles.text, style]}>
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});
