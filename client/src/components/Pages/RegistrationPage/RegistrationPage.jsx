import { Input } from '@ui-kitten/components';
import React from 'react';
import {
  View, Button, Text, TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { registrationAction } from '../../../redux/Slices/userSlice';
import { gStyle } from '../../../styles/styles';

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
          <Text style={[gStyle.gText, {
            textAlign: 'center', marginTop: 15, marginBottom: 15, fontSize: 18,
          }]}
          >
            Create new account
          </Text>
          <TextInput
            style={gStyle.input}
            value={props.values.name}
            onChangeText={props.handleChange('name')}
            placeholder="Username"
          />
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
              title="SignUp"
              onPress={props.handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
