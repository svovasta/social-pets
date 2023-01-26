import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from '../components/Pages/MainPage';
import AddPostPage from '../components/Pages/AddPostPage';
import LoginPage from '../components/Pages/LoginPage/LoginPage';

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Авторизация' }}
        />
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ title: 'Главная' }}
        />
        <Stack.Screen
          name="AddPostPage"
          component={AddPostPage}
          options={{ title: 'Добавить пост' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
