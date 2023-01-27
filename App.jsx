import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Navigate from './src/navigation/navigate';

const Stack = createStackNavigator();
axios.defaults.baseURL = 'http://localhost:3001/';
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Navigate />
    </ApplicationProvider>
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
