import React from 'react';
import {
  View, Button, Text, TextInput, SafeAreaView, StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../config/firebase';
import { setUser } from '../../../redux/Slices/userSlice';
import { gStyle } from '../../../styles/styles';

export default function RegistrationPage() {
  const dispatch = useDispatch();

  const handleRegistration = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(setUser({
          email: user.email,
          id: user.id,
          token: user.accessToken,
        }));
      })
      .catch(console.error);
  };
  return (
    <SafeAreaView style={[gStyle.main, styles.container]}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          handleRegistration(values.email, values.password);
        }}
      >
        {(props) => (
          <View>
            <Text style={[gStyle.gText, {
              textAlign: 'center', marginTop: 15, marginBottom: 15, fontSize: 18,
            }]}
            >
              Create new account
            </Text>
            {/* <Text style={[gStyle.gText, { textAlign: 'center', marginTop: 15 }]}>
              Username
            </Text>
            <TextInput
              style={gStyle.input}
              value={props.values.name}
              onChangeText={props.handleChange('name')}
              placeholder="John Snow"
            /> */}
            <Text style={[gStyle.gText, { textAlign: 'center', marginTop: 5 }]}>
              Email
            </Text>
            <TextInput
              style={gStyle.input}
              value={props.values.email}
              onChangeText={props.handleChange('email')}
              placeholder="winter.is@comming.com"
            />
            <Text style={[gStyle.gText, { textAlign: 'center', marginTop: 5 }]}>
              Password
            </Text>
            <TextInput
              style={gStyle.input}
              value={props.values.password}
              secureTextEntry
              onChangeText={props.handleChange('password')}
              placeholder="********"
            />
            <View style={gStyle.btn}>
              <Button
                title="Sign Up"
                onPress={props.handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
