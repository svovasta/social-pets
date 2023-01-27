import React, { useState } from 'react';
import {
  TextInput, View, StyleSheet, Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addPostAction } from '../../../redux/Slices/postsSlice';

export default function AddPostPage() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ image: '', text: '' });
  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        keyboardType="url"
        name="image"
        value={input.image}
        onChange={changeHandler}
        placeholder="Выберите файл из галереи"
      />
      <TextInput
        style={styles.input}
        keyboardType="default"
        name="image"
        value={input.text}
        onChange={changeHandler}
        placeholder="Текст поста"
      />
      <Button title="Добавить пост" onPress={() => dispatch(addPostAction(input))} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 30,
    marginHorizontal: '20%',
    width: '60%',
  },
});
