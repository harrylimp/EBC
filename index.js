import { AppRegistry } from 'react-native';
import App from './App';

if (__DEV__) {
  require('react-devtools');
}

AppRegistry.registerComponent('EBC', () => App);
