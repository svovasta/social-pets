import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView, FlatList, RefreshControl, Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../../redux/Slices/postsSlice';
import { gStyle } from '../../../styles/styles';
import PostCard from '../../UI/PostCard';
import logo from '../../../../assets/pets.png';
import { findUserAction } from '../../../redux/Slices/userSlice';

export default function MainPage({ navigation }) {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findUserAction());
  }, []);

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
    <SafeAreaView style={gStyle.main}>
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

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
});
