import React, { useState } from 'react';
import {
  TextInput, View, StyleSheet, Button, TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addPostAction } from '../../../redux/Slices/postsSlice';

export default function AddPostPage({ navigation }) {
  const dispatch = useDispatch();

  return (

    <Formik
      initialValues={{ image: '', text: '' }}
      onSubmit={(values) => {
        dispatch(addPostAction(values));
        console.log(values);
        navigation.navigate('Main');
      }}
    >
      {(props) => (
        <View>
          <TextInput
            style={styles.input}
            value={props.values.image}
            onChangeText={props.handleChange('image')}
            placeholder="Выберите файл из галереи"
          />
          <TextInput
            style={styles.input}
            value={props.values.text}
            // multiline
            onChangeText={props.handleChange('text')}
            placeholder="Текст поста"
          />
          <Button
            title="Добавить пост"
            onPress={props.handleSubmit}
          />
        </View>

      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 15,
    marginVertical: 30,
    marginHorizontal: '20%',
    width: '60%',
    borderColor: 'silver',
    borderRadius: 5,
  },
});
