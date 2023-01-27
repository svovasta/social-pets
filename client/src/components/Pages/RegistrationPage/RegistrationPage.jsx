import { Input } from '@ui-kitten/components';
import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { registrationAction } from '../../../redux/Slices/userSlice';

export default function RegistrationPage() {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={(values) => {
        dispatch(registrationAction(values));
      }}
    >
      {(props) => (
        <View>
          <Input
            value={props.values.name}
            onChangeText={props.handleChange('name')}
            placeholder="Username"
          />
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
            title="SignUp"
            onPress={props.handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}
