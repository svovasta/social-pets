import React, { useState } from 'react';
import {
  TextInput, SafeAreaView, StyleSheet, Button, Image, View, Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { gStyle } from '../../../styles/styles';
import pic from '../../../../assets/dog.png';

export default function AddPostPage({ navigation }) {
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
    <SafeAreaView style={gStyle.main}>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={(values, { resetForm }) => {
          uploadImage(values.text);
          setImage('');
          resetForm({ values: '' });
        }}
      >
        {(props) => (
          <View>
            <View style={{ position: 'relative' }}>
              <View style={[gStyle.btn, {
                width: 125, marginTop: 30,
              }]}
              >
                <Button title="Pick photo" onPress={pickImage} />
              </View>
            </View>
            <View
              value={props.values.image}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <View>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
              </View>
            </View>
            <TextInput
              style={gStyle.input}
              value={props.values.text}
              onChangeText={props.handleChange('text')}
              placeholder="Post text"
            />
            <View style={[gStyle.btn, { width: 120 }]}>
              <Button
                title="Add post"
                onPress={props.handleSubmit}
              />
            </View>
            <Image source={pic} style={styles.pic} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    height: 48,
    width: '30%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 249, 166, 1)',
  },
  pic: {
    width: 150,
    height: 300,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 20,
  },
});
