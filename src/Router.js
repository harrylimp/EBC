import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import TestScreen from './components/screens/TestScreen';
import NavigatedScreen from './components/screens/NavigatedScreen';
import MainScreen from './components/screens/MainScreen';
import CardCreator from './components/screens/CardCreator';
import LoginScreen from './components/screens/LoginScreen';
import NFCTransferScreen from './components/screens/NFCTransferScreen';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="cardCreator" component={CardCreator} hideNavBar={true} />
        <Scene key="mainScreen" component={MainScreen} hideNavBar={true} />
        <Scene key="test" component={TestScreen} hideNavBar={true} />
        <Scene key="navigatedScreen" component={NavigatedScreen} hideNavBar={true} />
        <Scene key="loginScreen" component={LoginScreen} hideNavBar={true} />
        <Scene key="NFCTransferScreen" component={NFCTransferScreen} hideNavBar={true} initial />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
