import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePostAction } from '../../../redux/Slices/onePostSlice';
import PostCard from '../../UI/PostCard';
import mp from '../../../../assets/Discussions/mp.png';

export default function PostPage({ route }) {
  const { postId } = route.params;
  const dispatch = useDispatch();
  const onePost = useSelector((state) => state.onePost);

  useEffect(() => {
    dispatch(getOnePostAction(postId));
  }, []);

  return (
    <View style={{ backgroundColor: '#FFF8DC', height: '100%' }}>
      <Image
        source={mp}
        style={{
          width: '100%', height: 100, resizeMode: 'cover',
        }}
      />
      <View style={styles.postCard}>
        {onePost && <PostCard post={onePost} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    marginTop: 20,
  },
});
