import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// Screens
import MainPage from '../components/Pages/MainPage';
import AddPostPage from '../components/Pages/AddPostPage';
import LoginPage from '../components/Pages/LoginPage/LoginPage';

// Screens names

const mainPage = 'Home';
const addPostPage = 'Post';

const Tab = createBottomTabNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
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
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={mainPage} component={MainPage} />
        <Tab.Screen name={addPostPage} component={AddPostPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
