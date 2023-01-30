import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, TextInput, Button,
} from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction, getCommentsAction } from '../../../redux/Slices/commentsSlice';
import { gStyle } from '../../../styles/styles';
import CommentCard from './CommentCard';

function CommentsPage({ route }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const [input, setInput] = useState({ text: '' });
  const { activePost } = route.params;
  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    dispatch(getCommentsAction(activePost));
  }, []);

  return (
    <View>
      <ScrollView>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="default"
            name="image"
            value={input.text}
            onChange={changeHandler}
            placeholder="Текст комментария"
          />
          <Button title="Добавить" onPress={() => dispatch(addCommentAction(activePost, input))} />
        </View>
      </ScrollView>
      <View style={gStyle.main}>
        <FlatList
          refreshControl={<RefreshControl />}
          data={comments}
          renderItem={({ item }) => (
            <CommentCard
              comment={item}
              activePostId={activePost}
            />
          )}
        />
      </View>
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

export default CommentsPage;
