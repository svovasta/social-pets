import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {

  View, TextInput, Button, StyleSheet, SafeAreaView, Text,

} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction, getCommentsAction } from '../../../redux/Slices/commentsSlice';
import { gStyle } from '../../../styles/styles';
import CommentCard from './CommentCard';
import defaultAvatar from '../../../../assets/defaultavatar.png';
import { getOnePostAction } from '../../../redux/Slices/onePostSlice';

function CommentsPage({ route }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState('');
  const { activePost } = route.params;

  const onePost = useSelector((state) => state.onePost);

  useEffect(() => {
    dispatch(getOnePostAction(activePost));
  }, []);

  useEffect(() => {
    dispatch(getCommentsAction(activePost));
  }, []);

  useEffect(() => {
    dispatch(getCommentsAction(activePost));
  }, [input]);

  return (
    <SafeAreaView style={gStyle.main}>
      <View style={{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
      }}
      >
        <View style={styles.postContainer}>
          <View style={styles.topContainer}>
            <Avatar
              style={styles.avatar}
              source={user.avatar ? ({ uri: `http://192.168.3.127:3001/user/${onePost?.User?.avatar}` }) : (defaultAvatar)}
            />
            <Text style={styles.username}>
              {onePost?.User?.name}

            </Text>
          </View>
          <View style={styles.postText}>
            <Text>

              {onePost?.text}

            </Text>
          </View>
          <View style={styles.postData}>
            <Text style={{ color: 'grey' }}>

              {new Date(onePost?.createdAt).toLocaleDateString()}

            </Text>
          </View>
        </View>
      </View>
      <View>
        <TextInput
          style={gStyle.input}
          keyboardType="default"
          name="text"
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Comment text"
        />
        <Button
          title="Post"
          onPress={() => {
            dispatch(addCommentAction(activePost, input));

            dispatch(getCommentsAction(activePost));
            setInput('');
          }}
        />
      </View>
      <View style={styles.commentsList}>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <CommentCard
              comment={item}
              activePostId={activePost}
            />
          )}
        />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 30,
    marginHorizontal: '20%',
    width: '40%',
  },
  username: {
    marginLeft: 10,
    fontWeight: '700',
  },
  postText: {
    marginTop: 2,
    alignItems: 'flex-start',
    marginLeft: '12%',
  },
  postData: {
    alignItems: 'flex-start',
    marginLeft: '12%',
    marginTop: 5,
    marginBottom: 5,
  },
  commentsList: {
    marginTop: 30,
    height: 500,
  },
});

export default CommentsPage;
