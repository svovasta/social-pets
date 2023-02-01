import {
  StyleSheet, Text, View, SafeAreaView, Button, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { gStyle } from '../../../styles/styles';
import { editProfileAction } from '../../../redux/Slices/userSlice';

export default function EditProfile({ navigation, route }) {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const { postId } = route.params;

  const [image, setImage] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (text) => {
    const formData = new FormData();
    formData.append('image', {
      name: `${new Date().getTime()}`,
      uri: image,
      type: 'image/jpg',
    });
    formData.append('text', text);

    if (!formData._parts[0][1].uri) {
      return Alert.alert('Pick photo, please', '');
    }
    try {
      const uploadRes = await axios.post('/posts/upload-image', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error.message);
    }
  };

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
