import React, { useState } from 'react';
import {
  TextInput, SafeAreaView, StyleSheet, Button, Image, View, Alert, TouchableOpacity, Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { gStyle } from '../../../styles/styles';
import pic from '../../../../assets/dog.png';
import topImg from '../../../../assets/Discussions/top2.png';
import photoAdd from '../../../../assets/Discussions/photoAdd.png';

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
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismiss keyboard');
    }}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={topImg}
          style={{
            width: '100%', height: 95, position: 'absolute', top: 4,
          }}
        />
        <Formik
          initialValues={{ text: '' }}
          onSubmit={(values, { resetForm }) => {
            uploadImage(values.text);
            setImage('');
            resetForm({ values: '' });
          }}
        >
          {(props) => (
            <View style={{ alignItems: 'center' }}>
              {image === '' ? (
                <TouchableOpacity
                  style={{
                    width: 300,
                    height: 300,
                    marginTop: 90,
                    borderRadius: '150%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'auto',
                    borderColor: '#A0522D',
                    borderWidth: 4,
                    backgroundColor: 'rgba(160,82,45,0.1)',
                  }}
                  onPress={pickImage}
                >
                  <Image
                    source={photoAdd}
                    style={{
                      width: '40%',
                      height: '40%',
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: '100%',
                      height: '55%',
                      marginTop: 90,
                    }}
                  />
                  )}
                  <TouchableOpacity onPress={pickImage}>
                    <Text style={{
                      color: '#A0522D',
                      fontWeight: '600',
                      fontSize: 16,
                      marginTop: 5,
                    }}
                    >
                      Update photo
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <View style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginTop: 50,
              }}
              >
                <TextInput
                  style={{
                    backgroundColor: '#F6F7FB',
                    height: 58,
                    marginBottom: 20,
                    fontSize: 16,
                    borderRadius: 10,
                    padding: 12,
                    width: '80%',
                  }}
                  value={props.values.text}
                  onChangeText={props.handleChange('text')}
                  placeholder="Add description to your post"
                  multiline
                />
                <TouchableOpacity
                  style={styles.botton}
                  onPress={props.handleSubmit}
                >
                  <Text style={{ fontWeight: 'bold', color: '#FFF8DC', fontSize: 18 }}>
                    Add post
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#FFF8DC',
    height: '100%',
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: '80%',
    borderWidth: 2,
    borderColor: '#A0522D',
  },
  botton: {
    backgroundColor: '#A0522D',
    height: 58,
    borderRadius: 10,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
