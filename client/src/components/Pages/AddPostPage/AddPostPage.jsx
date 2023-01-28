import React, { useState } from 'react';
import {
  TextInput, View, StyleSheet, Button,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAction } from '../../../redux/Slices/postsSlice';
import { gStyle } from '../../../styles/styles';

export default function AddPostPage({ navigation }) {
  const dispatch = useDispatch();

  return (

    <Formik
      initialValues={{ image: '', text: '' }}
      onSubmit={(values, { resetForm }) => {
        dispatch(addPostAction(values));
        console.log(values);
        navigation.navigate('HomeScreen');
        resetForm({ values: '' });
      }}
    >
      {(props) => (
        <View>
          <TextInput
            style={gStyle.input}
            value={props.values.image}
            onChangeText={props.handleChange('image')}
            placeholder="Выберите файл из галереи"
          />
          <TextInput
            style={gStyle.input}
            value={props.values.text}
            // multiline
            onChangeText={props.handleChange('text')}
            placeholder="Текст поста"
          />
          <View style={gStyle.btn}>
            <Button
              title="Добавить пост"
              onPress={props.handleSubmit}
            />
          </View>
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
