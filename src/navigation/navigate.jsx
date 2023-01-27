import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
// Screens
import MainPage from '../components/Pages/MainPage';
import AddPostPage from '../components/Pages/AddPostPage';
import ProfilePage from '../components/Pages/ProfilePage';
import FavouritesPage from '../components/Pages/FavouritesPage';
import LoginPage from '../components/Pages/LoginPage/LoginPage';

// Screens names

const mainPage = 'Home';
const addPostPage = 'Post';
const profilePage = 'Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>

      {/* <Stack.Navigator>
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
      </Stack.Navigator> */}

      <Tab.Navigator
        initialRouteName={mainPage}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const rn = route.name;
            if (rn === mainPage) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === addPostPage) {
              iconName = focused ? 'add' : 'add';
            } else if (rn === profilePage) {
              iconName = focused ? undefined : null;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={mainPage} component={MainPage} />
        <Tab.Screen name={addPostPage} component={AddPostPage} />
        <Tab.Screen name={profilePage} component={ProfilePage} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}
