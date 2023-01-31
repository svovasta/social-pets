import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePostsAction } from '../../../redux/Slices/onePostSlice';
import PostCard from '../../UI/PostCard';

export default function PostPage({ route }) {
  const { postId } = route.params;
  const dispatch = useDispatch();
  const onePost = useSelector((state) => state.onePost);
  useEffect(() => {
    dispatch(getOnePostsAction(postId));
  }, []);
  return (
    <SafeAreaView style={styles.postCard}>
      <PostCard post={onePost} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postCard: {

  },
});
