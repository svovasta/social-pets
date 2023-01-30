import React, { useState } from 'react';
import {
  TextInput, SafeAreaView, StyleSheet, Button, Image, View,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { addPostAction } from '../../../redux/Slices/postsSlice';
import { gStyle } from '../../../styles/styles';
import pic from '../../../../assets/dog.png';

export default function AddPostPage({ navigation }) {
  const dispatch = useDispatch();

  const [image, setImage] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', {
      name: `${new Date()}_image`,
      uri: image,
      type: 'image/jpg',
    });

    try {
      const res = await axios.post('/posts/upload-image', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('++++++++++++++++++++++++++++');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={gStyle.main}>
      <Formik
        initialValues={{ image: '', text: '' }}
        onSubmit={(values, { resetForm }) => {
          dispatch(addPostAction(values));
          // console.log(values);
          // console.log('====================================');
          // console.log(image);
          // console.log('====================================');
          navigation.navigate('HomeScreen');
          resetForm({ values: '' });
        }}
      >
        {(props) => (
          <View>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={gStyle.input}
                value={props.values.text}
                onChangeText={props.handleChange('text')}
                placeholder="Выберите фото"
              />
              <View style={[gStyle.btn, {
                width: 65, position: 'absolute', right: '21%', top: '27%',
              }]}
              >
                <Button title="Pick" onPress={pickImage} />
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
              value={props.values.image}
              onChangeText={props.handleChange('image')}
              placeholder="Вставьте URL ссылку на изображение"
            />
            <TextInput
              style={gStyle.input}
              value={props.values.text}
              // multiline
              onChangeText={props.handleChange('text')}
              placeholder="Текст поста"
            />
            <View style={[gStyle.btn, { width: 170 }]}>
              <Button
                title="Добавить пост"
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
