import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {

  View, ScrollView, TextInput, Button, StyleSheet, SafeAreaView, Text, RefreshControl,

} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { addCommentAction, getCommentsAction } from '../../../redux/Slices/commentsSlice';
import { gStyle } from '../../../styles/styles';
import CommentCard from './CommentCard';
import defaultAvatar from '../../../../assets/defaultavatar.png';
import { findUserAction } from '../../../redux/Slices/userSlice';

function CommentsPage({ route }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const comments = useSelector((state) => state.comment);
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { activePost } = route.params;

  const posts = useSelector((s) => s.posts);
  const chosenpost = posts.find((el) => el.id === activePost);

  useEffect(() => {
    dispatch(getCommentsAction(activePost));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getCommentsAction(activePost));
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

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
                source={user.avatar ? ({ uri: `http://192.168.3.127:3001/user/${comments[0]?.User?.avatar}` }) : (defaultAvatar)}
              />
              <Text style={styles.username}>
                {chosenpost?.User?.name}
              </Text>
            </View>
            <View style={styles.postText}>
              <Text>
                {comments[0]?.Post?.text}
              </Text>
            </View>
            <View style={styles.postData}>
              <Text style={{ color: 'grey' }}>
                {new Date(comments[0]?.Post?.createdAt).toLocaleDateString()}
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
