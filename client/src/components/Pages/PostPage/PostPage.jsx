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
  console.log('postId ------>', postId);
  const dispatch = useDispatch();
  const onePost = useSelector((state) => state.onePost);

  console.log('===============ONE POST=================');
  console.log(onePost);
  console.log('====================================');

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
