import React from 'react';
import {
  TextInput, Button, Text, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { loginAction } from '../../../redux/Slices/userSlice';
import { gStyle } from '../../../styles/styles';

export default function LoginPage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        dispatch(loginAction(values));
      }}
    >
      {(props) => (
        <View>
          <TextInput
            style={gStyle.input}
            value={props.values.email}
            onChangeText={props.handleChange('email')}
            placeholder="Email"
          />
          <TextInput
            style={gStyle.input}
            value={props.values.password}
            onChangeText={props.handleChange('password')}
            placeholder="Password..."
          />
          <View style={gStyle.btn}>
            <Button
              title="SignIn"
              onPress={props.handleSubmit}
            />
          </View>
          <Text style={[gStyle.gText, {
            textAlign: 'center', marginTop: 15, marginBottom: 15, fontSize: 18,
          }]}
          >
            Already have an account?
          </Text>
          <View style={gStyle.btn}>
            <Button
              title="Create new account"
              onPress={() => navigation.navigate('SignUpScreen')}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
