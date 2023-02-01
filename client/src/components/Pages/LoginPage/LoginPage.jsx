import React, { useState } from 'react';
import {
  TextInput, Button, Text, View, SafeAreaView, Image, StyleSheet, Alert, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUserFirestorm } from '../../../redux/Slices/userFirestormSlice';
import { gStyle } from '../../../styles/styles';
import cat from '../../../../assets/cat.png';
import { auth } from '../../../../config/firebase';
import { loginAction } from '../../../redux/Slices/userSlice';
import pattern from '../../../../assets/pattern.png';

export default function LoginPage({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUserFirestorm({
          email: user.email,
          id: user.id,
          token: user.accessToken,
        }));
      })
      .catch((error) => Alert.alert('Invalid user!', error.message));
    dispatch(loginAction({ email, password }));
  };
  return (
    <SafeAreaView style={[gStyle.main, styles.container]}>
      <Image
        source={pattern}
        style={{
          width: '100%', height: 340, position: 'absolute', top: 0, resizeMode: 'cover',
        }}
      />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values.email, values.password);
          resetForm({ values: '' });
        }}
      >
        {(props) => (
          <View style={{
            width: '100%', height: '70%', position: 'absolute', bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 60,
          }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 42, fontWeight: 'bold', alignSelf: 'center', paddingBottom: 34, color: '#8B4513', marginTop: 40,
              }}
              >
                Login
              </Text>
              <TextInput
                style={styles.input}
                value={props.values.email}
                onChangeText={props.handleChange('email')}
                placeholder="Enter email..."
              />
              <TextInput
                style={styles.input}
                value={props.values.password}
                secureTextEntry
                onChangeText={props.handleChange('password')}
                placeholder="Enter password..."
              />
              <TouchableOpacity style={styles.botton} onPress={props.handleSubmit}>
                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log in</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
            }}
            >
              <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={{ color: '#A0522D', fontWeight: '600', fontSize: 16 }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cat: {
    position: 'absolute',
    right: '12.5%',
    top: '-1%',
    width: 100,
    height: 100,
    zIndex: 100,
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: '80%',
  },
  botton: {
    backgroundColor: '#A0522D',
    height: 58,
    borderRadius: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
