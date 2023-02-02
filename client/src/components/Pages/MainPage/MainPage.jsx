import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView, FlatList, RefreshControl, Button, Image, View, ScrollView, TouchableOpacity, Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getPostsAction } from '../../../redux/Slices/postsSlice';
import PostCard from '../../UI/PostCard';
import { findUserAction } from '../../../redux/Slices/userSlice';
import { getFollowedPostsAction } from '../../../redux/Slices/followersSlice';
import mp from '../../../../assets/Discussions/mp.png';

export default function MainPage() {
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
    <View style={{ backgroundColor: '#FFF8DC' }}>
      <Image
        source={mp}
        style={{
          width: '100%', height: 100, resizeMode: 'cover',
        }}
      />
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.botton} onPress={() => setFoll(!foll)}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>{foll ? (<Text>All Posts</Text>) : (<Text>Following</Text>)}</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <FlatList
          style={{ marginBottom: 350 }}
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
      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  botton: {
    backgroundColor: '#A0522D',
    height: 38,
    borderRadius: 10,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
