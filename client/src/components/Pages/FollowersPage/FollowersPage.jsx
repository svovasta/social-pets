import {
  Image, StyleSheet, Text, View, SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowedPostsAction } from '../../../redux/Slices/followersSlice';

export default function FollowersPage() {
  const dispatch = useDispatch();
  const fposts = useSelector((s) => s.followers);
  console.log(fposts);

  useEffect(() => {
    dispatch(getFollowedPostsAction());
  }, []);

  return (
    <SafeAreaView>
      <View style={{ marginTop: 70, justifyContent: 'center' }}>
        {fposts.map((el) => (
          <View>
            <Image style={styles.postImage} key={el.id} source={{ uri: `http://localhost:3001/posts/${el.image}` }} />
            <Text>{el.User.name}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postImage: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 150,
    width: '100%',
    height: 150,
  },
});
