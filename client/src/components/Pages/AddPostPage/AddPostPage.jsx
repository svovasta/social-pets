import React, { useState } from 'react';
import {
  TextInput, View, StyleSheet, Button,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addPostAction, getPostsAction } from '../../../redux/Slices/postsSlice';
import { userLogoutAction } from '../../../redux/Slices/userSlice';

export default function AddPostPage() {
  const dispatch = useDispatch();
  // const [input, setInput] = useState({ image: '', text: '' });
  // const changeHandler = (e) => {
  //   setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  return (

    <Formik
      initialValues={{ image: '', text: '' }}
      onSubmit={(values) => {
        dispatch(getPostsAction());
        console.log(values);
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
