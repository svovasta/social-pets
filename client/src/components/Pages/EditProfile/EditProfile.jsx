import {
  StyleSheet, Text, View, SafeAreaView, Button,
} from 'react-native';
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { gStyle } from '../../../styles/styles';
import { editProfileAction, findUserAction } from '../../../redux/Slices/userSlice';

export default function EditProfile({ navigation }) {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // axios.patch(`/user/${user.id}/edit`)
  //   //   .then((res) => console.log(res.data));
  //   dispatch(findUserAction());
  // }, []);

  return (
    <SafeAreaView style={[gStyle.main, styles.container]}>
      <Formik
        initialValues={{ name: user.name, description: user.description }}
        onSubmit={(values) => {
          dispatch(editProfileAction(user.id, values));
          navigation.navigate('ProfileScreen');
        }}
      >
        {(props) => (
          <View>
            <View style={{ marginTop: 30 }}>
              <View>
                <Text style={[gStyle.gText, { textAlign: 'center' }]}>
                  Name
                </Text>
                <TextInput
                  style={gStyle.input}
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                />
              </View>
              <View>
                <Text style={[gStyle.gText, { textAlign: 'center', marginTop: 20 }]}>
                  Description
                </Text>
                <TextInput
                  style={gStyle.input}
                  value={props.values.description}
                  onChangeText={props.handleChange('description')}
                />
              </View>
              <View>
                <Button
                  title="Save changes"
                  type="submit"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
