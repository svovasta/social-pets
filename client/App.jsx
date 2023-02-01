import React, { useEffect, useState } from 'react';
import { StyleSheet, LogBox } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Provider } from 'react-redux';
import axios from 'axios';
import Navigate from './src/navigation/navigate';
import store from './src/redux/store';
import './config/firebase';
import 'react-native-gesture-handler';

axios.defaults.baseURL = 'http://192.168.3.127:3001';

export default function App() {

  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigate />
      </ApplicationProvider>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
