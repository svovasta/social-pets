import React, { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePostAction } from '../../../redux/Slices/onePostSlice';
import PostCard from '../../UI/PostCard';

export default function PostPage({ route }) {
  const { postId } = route.params;
  const dispatch = useDispatch();
  const onePost = useSelector((state) => state.onePost);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getOnePostAction(postId));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getOnePostAction(postId));
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView refreshControl={(
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
)}
    >
      <View style={styles.postCard}>
        {onePost && <PostCard post={onePost} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postCard: {
    marginTop: 20,
  },
});
