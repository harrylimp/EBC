import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
} from 'react-native';

export default class Draggable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      pan: new Animated.ValueXY({ x: props.x, y: props.y }),
    };
  }

  componentWillMount() {
    this._val = { x: this.state.x, y:this.state.y }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this._val.x, y: this._val.y });
        this.state.pan.setValue({ x: 0, y:0 });
        // console.log('onPanResponderGrant', this.state.pan.x);
      },
      onPanResponderRelease: () => {
        this.state.pan.flattenOffset();
        let transform = this.state.pan.getTranslateTransform();
        console.log('does this val change',this._val);
        console.log('someone pls help', this.state.pan.ValueXY);
      }
    });
  }

  render() {
    const { children } = this.props;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }

    console.log("help me please?", panStyle);
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.text]}
      >
        {children}
      </Animated.View>
    );
  }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    backgroundColor: 'red',
  }
})