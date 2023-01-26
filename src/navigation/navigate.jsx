import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from '../components/Pages/MainPage';
import AddPostPage from '../components/Pages/AddPostPage';
import ProfilePage from '../components/Pages/ProfilePage';
import FavouritesPage from '../components/Pages/FavouritesPage';

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ title: 'ProfilePage' }}
        />
        <Stack.Screen
          name="FavouritesPage"
          component={FavouritesPage}
          options={{ title: 'FavouritesPage' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
