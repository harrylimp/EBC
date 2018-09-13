import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated, TouchableOpacity } from 'react-native';

const AnimatedView = Animated.AnimatedView;

export default class Draggable extends Component {
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
    this._val = { x: this.state.x, y: this.state.y };
    this.state.pan.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this._val.x, y: this._val.y });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderRelease: () => {
        this.props.updateCard({ id: this.state.id, x: this._val.x, y: this._val.y });
        this.state.pan.flattenOffset();
        let transform = this.state.pan.getTranslateTransform();
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        Math.abs(gestureState.dx) > 1 && Math.abs(gestureState.dy) > 1
    });
  }

  render() {
    const { children, style, onPress } = this.props;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    return (
      <Animated.View {...this.panResponder.panHandlers} style={[panStyle, styles.text, style]}>
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
