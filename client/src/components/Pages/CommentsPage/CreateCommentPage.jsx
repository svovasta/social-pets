import axios from 'axios';
import React, { useState } from 'react';
import {
  View, ScrollView, TextInput, Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addCommentAction } from '../../../redux/Slices/commentsSlice';

function CreateCommentPage() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ text: '' });
  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.input}
          keyboardType="default"
          name="image"
          value={input.text}
          onChange={changeHandler}
          placeholder="Текст поста"
        />
        <Button title="Добавить пост" onPress={() => dispatch(addCommentAction(input))} />
      </View>
    </ScrollView>
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

export default CreateCommentPage;
