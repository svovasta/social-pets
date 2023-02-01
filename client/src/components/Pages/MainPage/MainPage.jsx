import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView, FlatList, RefreshControl, Button, Image, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getPostsAction } from '../../../redux/Slices/postsSlice';
import { gStyle } from '../../../styles/styles';
import PostCard from '../../UI/PostCard';
import { findUserAction } from '../../../redux/Slices/userSlice';
import { getFollowedPostsAction } from '../../../redux/Slices/followersSlice';
import mp from '../../../../assets/Discussions/mp.png';

export default function MainPage({ navigation }) {
  const posts = useSelector((state) => state.posts);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((s) => s.user);
  const [foll, setFoll] = useState(true);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(findUserAction());
  }, []);

  const fposts = useSelector((s) => s.followers).filter((el) => el.User.id !== user.id);

  useEffect(() => {
    dispatch(getFollowedPostsAction());
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
  }, [isFocused]);

  return (
    <View style={{ width: '100%', backgroundColor: '#FFF8DC' }}>
      <Image
        source={mp}
        style={{
          width: '100%', height: 100, resizeMode: 'cover',
        }}
      />
      <FlatList
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
)}
        data={foll ? posts : fposts}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
      />
      <Button
        title={foll ? 'All posts' : 'Following'}
        onPress={() => setFoll(!foll)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
});
