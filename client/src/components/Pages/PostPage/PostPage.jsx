import React, { useEffect } from 'react';
import {
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

  useEffect(() => {
    dispatch(getOnePostAction(postId));
  }, []);

  return (
    <View style={styles.postCard}>
      {onePost && <PostCard post={onePost} />}
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    marginTop: 20,
  },
});
