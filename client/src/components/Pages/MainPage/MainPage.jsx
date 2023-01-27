import React, { useEffect, useState } from 'react';
import {
  Button, View, FlatList, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { gStyle } from '../../../styles/styles';
import PostCard from '../../UI/PostCard';
// import getPostsAction from '../../../redux/Slices/postsSlice';

export default function MainPage({ navigation }) {
  // const posts = useSelector((state) => state.posts);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getPostsAction());
  // }, []);
  const loadScene = () => {
    navigation.navigate('AddPostPage');
  };

  const [testPosts, setPosts] = useState([
    { username: 'Vova', text: 'Text' },
    { username: 'Zarina', text: 'Text2' },
    { username: 'Lesha', text: 'Text3' },
    { username: 'Volodya', text: 'Text4' },
    { username: 'Vova', text: 'Text' },
    { username: 'Zarina', text: 'Text2' },
    { username: 'Lesha', text: 'Text3' },
    { username: 'Volodya', text: 'Text4' },
  ]);
  return (
    <View style={gStyle.main}>
      <FlatList
        refreshControl={<RefreshControl />}
        data={testPosts}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
      />

    </View>
  );
}
