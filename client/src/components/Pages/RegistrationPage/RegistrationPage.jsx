import React from 'react';
import {
  View, Button, Text, TextInput, SafeAreaView, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../config/firebase';
import { setUserFirestorm } from '../../../redux/Slices/userFirestormSlice';
import { gStyle } from '../../../styles/styles';
import { registrationAction } from '../../../redux/Slices/userSlice';
import pattern from '../../../../assets/pattern.png';

export default function RegistrationPage({ navigation }) {
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
      <Image
        source={pattern}
        style={{
          width: '100%', height: 340, position: 'absolute', top: 0, resizeMode: 'cover',
        }}
      />
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        onSubmit={(values, { resetForm }) => {
          handleRegistration(values.email, values.password, values.name);
          resetForm({ values: '' });
        }}
      >
        {(props) => (
          <View style={{
            width: '100%', height: '80%', position: 'absolute', bottom: 0, backgroundColor: '#fff', borderTopEndRadius: 60,
          }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 42, fontWeight: 'bold', alignSelf: 'center', paddingBottom: 34, color: '#8B4513', marginTop: 40,
              }}
              >
                Registration
              </Text>
              <TextInput
                style={styles.input}
                value={props.values.name}
                onChangeText={props.handleChange('name')}
                placeholder="Enter your name"
              />
              <TextInput
                style={styles.input}
                value={props.values.email}
                onChangeText={props.handleChange('email')}
                placeholder="Enter your email"
              />
              <TextInput
                style={styles.input}
                value={props.values.password}
                secureTextEntry
                onChangeText={props.handleChange('password')}
                placeholder="Enter your password"
              />
              <TouchableOpacity style={styles.botton} onPress={props.handleSubmit}>
                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Create new account</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
            }}
            >
              <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                <Text style={{ color: '#A0522D', fontWeight: '600', fontSize: 16 }}> Log in</Text>
              </TouchableOpacity>
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
