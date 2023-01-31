import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Provider } from 'react-redux';
import axios from 'axios';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigate from './src/navigation/navigate';
import store from './src/redux/store';
import 'react-native-gesture-handler';

// axios.defaults.baseURL = 'http://localhost:3001';

axios.defaults.baseURL = 'http://192.168.3.127:3001';

const fonts = () => Font.loadAsync({
  'rob-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  'rob-light': require('./assets/fonts/Roboto-Light.ttf'),
  'rob-thin': require('./assets/fonts/Roboto-Thin.ttf'),
  'rob-regular': require('./assets/fonts/Roboto-Regular.ttf'),
});

export default function App() {
  const [font, setFont] = useState(false);

  if (font) {
    return (
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Navigate />
        </ApplicationProvider>
      </Provider>
    );
  }
  return (
    <AppLoading
      startAsync={fonts}
      onFinish={() => setFont(true)}
      onError={console.warn}
    />
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
