import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import TestScreen from './components/screens/TestScreen';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="test" component={TestScreen} hideNavBar={true} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;