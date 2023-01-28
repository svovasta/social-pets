import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, Octicons, MaterialIcons } from '@expo/vector-icons';
// Screens
import { useDispatch, useSelector } from 'react-redux';
import MainPage from '../components/Pages/MainPage';
import AddPostPage from '../components/Pages/AddPostPage';
import ProfilePage from '../components/Pages/ProfilePage';
import FavouritesPage from '../components/Pages/FavouritesPage';
import LoginPage from '../components/Pages/LoginPage';
import RegistrationPage from '../components/Pages/RegistrationPage/RegistrationPage';

import PostPage from '../components/Pages/PostPage';
import EditProfile from '../components/Pages/EditProfile';
import HealthPage from '../components/Pages/HealthPage';
import DiscussionsPage from '../components/Pages/DiscussionsPage';

import { userCheckAction } from '../redux/Slices/userSlice';

// Screens names

const mainPage = 'Home';
const addPostPage = 'Post';
const profilePage = 'Profile';
const healthPage = 'Health';

const loginPage = 'Sign In';
const registrationPage = 'SignUp';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userCheckAction());
  }, []);
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const rn = route.name;
            if (rn === mainPage) {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } if (rn === addPostPage) {
              iconName = focused ? 'add' : 'add';
              return <Ionicons name={iconName} size={size} color={color} />;
            } if (rn === profilePage) {
              iconName = focused ? 'pets' : 'pets';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            }
            if (rn === healthPage) {
              iconName = focused ? 'md-medical' : 'md-medical';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
            if (rn === loginPage) {
              iconName = focused ? 'sign-in' : 'sign-in';
              return <Octicons name={iconName} size={size} color={color} />;
            }
          },
        })}
      >
        {user ? (
          <>
            <BottomTab.Screen
              name="Home"
              component={HomeNavigator}
              options={{ headerShown: false }}
            />
            <BottomTab.Screen
              name="Post"
              component={AddPostNavigator}
              options={{ headerShown: false }}
            />
            <BottomTab.Screen
              name="Health"
              component={HealthNavigator}
              options={{ headerShown: false }}
            />
            <BottomTab.Screen
              name="Profile"
              component={ProfileNavigator}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <BottomTab.Screen
              name="Home"
              component={HomeNavigator}
              options={{ headerShown: false }}
            />
            <BottomTab.Screen
              name="Sign In"
              component={SignInNavigator}
              options={{ headerShown: false }}
            />
          </>
        )}

      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={MainPage}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const AddPostStack = createStackNavigator();

function AddPostNavigator() {
  return (
    <AddPostStack.Navigator initialRouteName="AddPostScreen">
      <AddPostStack.Screen
        name="AddPostScreen"
        component={AddPostPage}
        options={{ headerShown: false }}
      />
    </AddPostStack.Navigator>
  );
}

const HealthStack = createStackNavigator();

function HealthNavigator() {
  return (
    <HealthStack.Navigator initialRouteName="HealthScreen">
      <HealthStack.Screen
        name="HealthScreen"
        component={HealthPage}
        options={{ headerShown: false }}
      />
    </HealthStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileScreen">
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="FavouritesScreen"
        component={FavouritesPage}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

const SignInStack = createStackNavigator();

function SignInNavigator() {
  return (
    <SignInStack.Navigator initialRouteName="SignInScreen">
      <SignInStack.Screen
        name="SignInScreen"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <SignInStack.Screen
        name="SignUpScreen"
        component={RegistrationPage}
        options={{ headerShown: false }}
      />
    </SignInStack.Navigator>
  );
}
