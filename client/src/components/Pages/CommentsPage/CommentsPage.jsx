import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {

  View, ScrollView, TextInput, Button, StyleSheet, SafeAreaView, Text, RefreshControl, Image,
  TouchableOpacity,
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
import { getOnePostAction } from '../../../redux/Slices/onePostSlice';
import topImg from '../../../../assets/Discussions/top2.png';

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getCommentsAction(activePost));
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={gStyle.main}>
      <Image
        source={topImg}
        style={{
          width: '100%', height: 95, position: 'absolute', top: 4,
        }}
      />
      <View style={{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginTop: 55,
      }}
      >
        <View style={styles.postContainer}>
          <View style={styles.topContainer}>
            <Avatar
              style={styles.avatar}
              source={user.avatar ? ({ uri: `http://localhost:3001/user/${comments[0]?.User?.avatar}` }) : (defaultAvatar)}
            />
            <Text style={styles.username}>
              {chosenpost?.User?.name}

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
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
        <TextInput
          style={styles.input}
          keyboardType="default"
          name="text"
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Comment text"
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(addCommentAction(activePost, input));

            dispatch(getCommentsAction(activePost));
            setInput('');
          }}
          style={styles.botton}
        >
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
            Post
          </Text>
        </TouchableOpacity>

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
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: '80%',
  },
  botton: {
    backgroundColor: '#A0522D',
    height: 58,
    borderRadius: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default CommentsPage;
