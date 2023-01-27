import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FavouritesPage from '../components/Pages/FavouritesPage';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FavouritesPage"
          component={FavouritesPage}
          options={{ title: 'FavouritesPage' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
