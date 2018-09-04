import React, { Component } from 'react';
import { Animated } from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default class SvgExample extends Component {
  state = {
    _visibility1: new Animated.Value(0),
    _visibility2: new Animated.Value(0),
    _visibility3: new Animated.Value(0)
  };

  componentDidMount() {}

  render() {
    Animated.timing(
      // Animate over time
      this.state._visibility1,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
    Animated.timing(
      // Animate over time
      this.state._visibility2,
      {
        toValue: 1,
        duration: 2000
      }
    ).start();
    Animated.timing(
      // Animate over time
      this.state._visibility3,
      {
        toValue: 1,
        duration: 3000
      }
    ).start();

    return (
      <Svg
        height="100"
        width="100"
        viewBox="0 0 908.000000 738.000000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G
          transform="translate(0.000000,738.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <AnimatedPath
            opacity={this.state._visibility1.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M1944 7170 c-109 -23 -205 -105 -245 -209 -27 -71 -37 -229 -19 -309 25 -112 86 -195 173 -232 104 -46 279 -35 350 21 23 18 27 28 27 74 0 30 -4 56 -10 60 -5 3 -33 -6 -61 -21 -62 -31 -142 -41 -192 -25 -47 16 -102 80 -116 136 -14 57 -14 174 0 230 16 65 77 130 134 144 56 14 124 1 178 -35 53 -35 67 -27 67 40 0 48 -3 57 -30 80 -50 41 -173 64 -256 46z"
            fill="white"
          />
          <AnimatedPath
            opacity={this.state._visibility1.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M2860 7170 c-157 -33 -247 -141 -270 -325 -25 -205 40 -368 172 -425 70 -31 221 -39 299 -16 71 20 140 67 172 115 119 180 89 501 -56 598 -27 18 -65 37 -85 43 -55 15 -181 20 -232 10z m181 -143 c70 -37 93 -88 97 -219 5 -127 -11 -188 -63 -241 -40 -41 -79 -52 -161 -45 -66 6 -100 28 -134 89 -20 37 -25 61 -28 144 -6 155 24 230 108 273 59 29 124 29 181 -1z"
            fill="white"
          />
          <AnimatedPath
            opacity={this.state._visibility2.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M3750 7163 c-39 -14 -40 -26 -40 -395 0 -405 -7 -373 83 -372 30 0 52 6 58 15 6 8 9 124 7 289 l-3 275 37 -78 c77 -160 239 -454 262 -476 20 -19 32 -22 97 -19 67 3 75 5 86 28 18 35 19 710 1 728 -15 15 -92 16 -119 2 -18 -10 -19 -24 -19 -265 l0 -255 -51 97 c-207 397 -212 405 -246 419 -32 14 -123 18 -153 7z"
            fill="white"
          />
          <AnimatedPath
            opacity={this.state._visibility2.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M4809 7151 l-24 -19 -3 -354 c-1 -203 2 -359 7 -367 6 -9 27 -15 58 -15 89 -1 83 -23 84 291 0 276 1 278 18 238 38 -85 254 -481 274 -502 18 -20 31 -23 92 -23 112 0 105 -26 105 391 0 263 -3 358 -12 367 -19 19 -103 15 -124 -5 -15 -15 -16 -41 -12 -270 l5 -253 -84 162 c-168 325 -183 349 -219 364 -50 21 -137 18 -165 -5z"
            fill="white"
          />
          <AnimatedPath
            opacity={this.state._visibility3.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M6697 7163 c-27 -7 -20 -27 78 -205 47 -87 85 -161 85 -165 0 -5 -43 -86 -95 -181 -52 -95 -96 -180 -97 -190 -3 -15 6 -17 72 -17 l75 0 75 142 c41 79 77 143 80 143 3 0 31 -51 63 -113 97 -189 85 -177 167 -177 52 0 72 4 76 14 3 8 -37 95 -90 193 -53 99 -96 182 -96 186 0 4 41 83 90 175 50 92 90 172 90 179 0 16 -54 26 -105 19 l-43 -7 -66 -129 c-37 -72 -70 -130 -74 -130 -4 0 -37 58 -74 129 -61 116 -71 129 -99 135 -35 7 -84 6 -112 -1z"
            fill="white"
          />
          <AnimatedPath
            opacity={this.state._visibility3.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M5872 7148 c-9 -9 -12 -104 -12 -364 0 -309 2 -355 16 -368 14 -14 44 -16 222 -14 l207 3 0 55 0 55 -148 3 -148 3 3 107 3 107 122 3 122 3 6 28 c3 16 3 40 0 54 l-7 26 -122 3 -121 3 -3 93 -3 92 140 0 c128 0 141 2 151 19 11 22 13 61 4 85 -5 14 -34 16 -213 16 -148 0 -210 -3 -219 -12z"
            fill="white"
          />
          <AnimatedPath
            opacity={this.state._visibility2.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M4371 6140 c-165 -44 -316 -167 -389 -320 -22 -47 -45 -109 -51 -138 -16 -75 -16 -4919 0 -4994 6 -29 29 -91 51 -138 74 -154 224 -277 393 -320 288 -74 590 62 713 320 22 47 45 109 51 138 16 75 16 4919 0 4994 -6 29 -29 91 -51 138 -49 103 -148 207 -249 263 -134 75 -315 97 -468 57z"
            fill="white"
          />
          <AnimatedPath
            opacity={this.state._visibility1.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M2500 4964 c-221 -47 -405 -223 -460 -439 -19 -76 -20 -111 -20 -1334 0 -1395 -2 -1332 67 -1471 77 -153 243 -278 418 -315 323 -68 645 128 725 440 19 76 20 111 20 1334 0 1063 -3 1267 -15 1326 -67 321 -403 531 -735 459z"
            fill="white"
          />
          <AnimatedPath
            opacity={this.state._visibility3.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })}
            d="M6338 4970 c-259 -47 -451 -229 -503 -477 -22 -102 -22 -2515 0 -2618 44 -210 201 -384 409 -452 115 -37 266 -37 381 0 212 69 365 239 410 454 22 102 22 2515 0 2618 -44 210 -203 386 -407 450 -88 28 -216 39 -290 25z"
            fill="white"
          />
          <AnimatedPath
            d="M701 3780 c-316 -83 -513 -423 -431 -744 84 -331 404 -528 725 -446 319 82 518 421 435 744 -85 332 -408 530 -729 446z"
            fill="white"
          />
          <AnimatedPath
            d="M8081 3780 c-210 -55 -375 -226 -431 -446 -83 -323 116 -662 435 -744 99 -25 191 -25 290 0 319 82 518 421 435 744 -85 332 -408 530 -729 446z"
            fill="white"
          />
        </G>
      </Svg>
    );
  }
}
