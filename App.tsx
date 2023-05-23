import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/Navigator/RootNavigator';
import {persistor, store} from './src/Redux/Store';
import CountryListingScreen from './src/Screens/CountryListingScreen';

const App = () => {
  return <CountryListingScreen />;
};

export default App;
