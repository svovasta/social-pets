import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, View, FlatList, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../../redux/Slices/postsSlice';
import { gStyle } from '../../../styles/styles';
import PostCard from '../../UI/PostCard';

export default function MainPage({ navigation }) {
  const posts = useSelector((state) => state.posts);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getPostsAction());
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    dispatch(getPostsAction());
  }, []);

  return (
    <View style={gStyle.main}>
      <FlatList
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
)}
        data={posts}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
      />
    </View>
  );
}
