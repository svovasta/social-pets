import React, { useState } from 'react';
import { Input } from '@ui-kitten/components';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { loginAction } from '../../../redux/Slices/userSlice';

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
          <Text>Already have an account?</Text>
          <Input
            value={props.values.email}
            onChangeText={props.handleChange('email')}
            placeholder="Email"
          />
          <Input
            value={props.values.password}
            onChangeText={props.handleChange('password')}
            placeholder="Password..."
          />
          <Button
            title="SignIn"
            onPress={props.handleSubmit}
          />
          <Button
            title="Create new account"
            onPress={() => navigation.navigate('Registration')}
          />
        </View>
      )}
    </Formik>

  );
}
