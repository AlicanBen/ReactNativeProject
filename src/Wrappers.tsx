import React from 'react';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import store from './store/storeConfig';

const Wrappers = ({ children }) => (
  <NativeBaseProvider>
    <Provider store={store}>{children}</Provider>
  </NativeBaseProvider>
);

export default Wrappers;
