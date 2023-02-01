import React from 'react';
import {
  View, Button, Text, TextInput, SafeAreaView, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../config/firebase';
import { setUserFirestorm } from '../../../redux/Slices/userFirestormSlice';
import { gStyle } from '../../../styles/styles';
import { registrationAction } from '../../../redux/Slices/userSlice';

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleRegistration = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUserFirestorm({
          email: user.email,
          id: user.id,
          token: user.accessToken,
        }));
      })
      .catch(console.error);
    dispatch(registrationAction({ email, password, name }));
  };
  return (
    <SafeAreaView style={[gStyle.main, styles.container]}>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        onSubmit={(values, { resetForm }) => {
          handleRegistration(values.email, values.password, values.name);
          resetForm({ values: '' });

          // initialValues={{ name: '', email: '', password: '' }}
          // onSubmit={(values, { resetForm }) => {
          //   dispatch(registrationAction(values));
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
            <Text style={[gStyle.gText, { textAlign: 'center', marginTop: 15 }]}>
              Username
            </Text>
            <TextInput
              style={gStyle.input}
              value={props.values.name}
              onChangeText={props.handleChange('name')}
              placeholder="John Snow"
            />
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
