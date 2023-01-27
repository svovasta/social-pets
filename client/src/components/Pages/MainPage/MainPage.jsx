import React, { useEffect, useState } from 'react';
import {
  Button, View, FlatList, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../../redux/Slices/postsSlice';
import { gStyle } from '../../../styles/styles';
import PostCard from '../../UI/PostCard';

export default function MainPage({ navigation }) {
  const posts = useSelector((state) => state.posts);
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsAction());
  }, []);

  return (
    <View style={gStyle.main}>
      <FlatList
        refreshControl={<RefreshControl />}
        data={posts}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
      />

    </View>
  );
}
