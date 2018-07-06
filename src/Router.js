import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import TestScreen from './components/screens/TestScreen';
import NavigatedScreen from './components/screens/NavigatedScreen';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="test" component={TestScreen} hideNavBar={true} initial/>
        <Scene key="navigatedScreen" component={NavigatedScreen} hideNavBar={true} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;