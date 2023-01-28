import React from 'react';
import {
  TextInput, Button, Text, View, SafeAreaView, Image, StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { loginAction } from '../../../redux/Slices/userSlice';
import { gStyle } from '../../../styles/styles';
import cat from '../../../../assets/cat.png';

export default function LoginPage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={[gStyle.main, styles.container]}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          dispatch(loginAction(values));
        }}
      >
        {(props) => (
          <View>
            <Image source={cat} style={styles.cat} />
            <View style={{ marginTop: 30 }}>
              <View>
                <Text style={[gStyle.gText, { textAlign: 'center' }]}>
                  Email
                </Text>
                <TextInput
                  style={gStyle.input}
                  value={props.values.email}
                  onChangeText={props.handleChange('email')}
                  placeholder="example@gmail.com"
                />
              </View>
              <View>
                <Text style={[gStyle.gText, { textAlign: 'center', marginTop: 20 }]}>
                  Password
                </Text>
                <TextInput
                  style={gStyle.input}
                  value={props.values.password}
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  placeholder="********"
                />
              </View>
              <View style={gStyle.btn}>
                <Button
                  title="Sign In"
                  onPress={props.handleSubmit}
                />
              </View>
              <View style={styles.haveAcc}>
                <Text style={[gStyle.gText, {
                  textAlign: 'center', marginTop: 15, marginBottom: 15,
                }]}
                >
                  Already have an account?
                </Text>
                <View style={[gStyle.btn, { width: 200 }]}>
                  <Button
                    title="Create new account"
                    onPress={() => navigation.navigate('SignUpScreen')}
                  />
                </View>
              </View>
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
  cat: {
    position: 'absolute',
    right: '12.5%',
    top: '-1%',
    width: 100,
    height: 100,
    zIndex: 100,
  },
  haveAcc: {
    marginTop: 50,
  },
});
