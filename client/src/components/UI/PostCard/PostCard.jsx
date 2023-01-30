import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, Button,
} from 'react-native';
import {
  Avatar,
} from '@ui-kitten/components';
import { AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import defaultAvatar from '../../../../assets/defaultavatar.png';
import {
  addFavesAction, deleteFavesAction, getFavesAction,
} from '../../../redux/Slices/faveSlice';
import { followAction } from '../../../redux/Slices/followersSlice';

export default function PostCard({ post }) {
  const [postLikes, setPostLikes] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);

  const user = useSelector((state) => state.user);
  const faves = useSelector((s) => s.faves);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const followers = useSelector((s) => s.followers);

  useEffect(() => {
    dispatch(getFavesAction());
  }, []);

  const addorDeleteLikeHandler = (postId) => {
    axios.post(`/posts/${postId}/likes`)
      .then((res) => setPostLikes(res.data))
      .catch(console.log);
  };
  useEffect(() => {
    axios(`/posts/${post.id}/user/like`)
      .then((res) => (res.data.message === 'yes' ? setLikeStatus(true) : setLikeStatus(false)))
      .catch((err) => {
        console.log(err);
      });
  }, [likeStatus]);

  useEffect(() => {
    axios(`/posts/${post.id}/likes`)
      .then((res) => setPostLikes(res.data))
      .catch(console.log);
  }, []);

  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      setLikeStatus((prev) => !prev);
      addorDeleteLikeHandler(post.id);
    });

  return (
    <SafeAreaView style={styles.card}>

      <View style={styles.topContainer}>
        <Avatar
          style={styles.avatar}
          source={user.avatar ? ({ uri: `http://192.168.3.127:3001/user/${post.User.avatar}` }) : (defaultAvatar)}
        />
        <Text style={styles.username}>{post.User.name}</Text>
        <Button title={followers.some((el) => el.User.id === post.User.id) ? 'unfollow' : 'follow'} onPress={() => dispatch(followAction(post.User.id))} />
      </View>
      <View>
        <GestureDetector gesture={tap}>
          <Image style={styles.postImage} source={{ uri: `http://192.168.3.127:3001/posts/${post.image}` }} />
        </GestureDetector>

      </View>

      <View style={styles.cardBottom}>
        <View style={styles.text}>
          <Text style={styles.username}>
            {post.User.name}
          </Text>
          <Text>
            {post.text}
          </Text>
        </View>
        <View>
          <Text style={{ color: 'grey' }}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => {
              setLikeStatus((prev) => !prev);
              addorDeleteLikeHandler(post.id);
            }}
            style={styles.heartContainer}
          >
            <AntDesign style={styles.heart} name={likeStatus ? 'heart' : 'hearto'} size={25} color="red" />
            <Text style={{ alignSelf: 'center', fontSize: 20, marginRight: 15 }}>
              {postLikes.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(

              'CommentScreen',
              { activePost: post.id },
            )}
          >
            <FontAwesome5 style={styles.comment} name="comment" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookmark}
            onPress={() => (!faves.find((el) => el.postId === post.id)
              ? dispatch(addFavesAction(post.id))
              : dispatch(deleteFavesAction(post.id)))}
          >
            <Feather name="bookmark" size={25} color={faves.find((el) => el.postId === post.id) ? 'red' : 'black'} />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  postImage: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 400,
    width: '100%',
    height: 400,
  },
  cardBottom: {
    left: 5,
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  username: {
    fontWeight: '700',
    marginRight: 5,
  },
  heartContainer: {
    flexDirection: 'row',
  },
  heart: {
    marginRight: 5,
  },
  card: {
    margin: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 10,
    position: 'relative',
  },
  bookmark: {
    position: 'absolute',
    right: '2%',
  },
});
