import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, Button,
} from 'react-native';
import {
  Avatar, Card, Modal,
} from '@ui-kitten/components';
import {
  AntDesign, FontAwesome5, Feather, MaterialIcons,
} from '@expo/vector-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import defaultAvatar from '../../../../assets/defaultavatar.png';
import {
  addFavesAction, deleteFavesAction, getFavesAction,
} from '../../../redux/Slices/faveSlice';
import { followAction, getFollowedPostsAction } from '../../../redux/Slices/followersSlice';
import { findUserAction } from '../../../redux/Slices/userSlice';

import { gStyle } from '../../../styles/styles';
import { deletePostAction } from '../../../redux/Slices/postsSlice';

export default function PostCard({ post }) {
  const followers = useSelector((s) => s.followers);
  const user = useSelector((state) => state.user);
  const faves = useSelector((s) => s.faves);

  const [postLikes, setPostLikes] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [faved, setFaved] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('==============IN USE EFFECT==============');
    console.log(post);
    console.log('====================================');
    axios(`/likes/${post.id}`)
      .then((res) => {
        console.log('============POST ID================');
        console.log(post.id);
        setPostLikes(res.data);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    axios(`/likes/${post.id}/user`)
      .then((res) => (res.data.message === 'yes' ? setLikeStatus(true) : setLikeStatus(false)))
      .catch((err) => {
        console.log(err);
      });
  }, [likeStatus]);

  useEffect(() => {
    dispatch(getFavesAction());
    dispatch(findUserAction());
    !faves.find((el) => el.postId === post.id) ? setFaved(false) : setFaved(true);
  }, [isFocused]);

  useEffect(() => {
    dispatch(getFollowedPostsAction());
    followers.find((el) => el.User.id === post.userId) ? setFollowed(false) : setFollowed(true);
  }, [isFocused]);

  const addorDeleteLikeHandler = (postId) => {
    axios.post(`/likes/${postId}`)
      .then((res) => setPostLikes(res.data))
      .catch(console.log);
  };

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
          source={user?.avatar ? ({ uri: `http://192.168.3.127:3001/user/${post?.User.avatar}` }) : (defaultAvatar)}
        />
        <Text style={styles.username}>{post?.User?.name}</Text>
        {user?.id === post?.User?.id ? null : (
          <Button
            title={followed ? 'follow' : 'unfollow'}
            onPress={() => {
              dispatch(followAction(post?.User?.id));
              setFollowed(!followed);
              dispatch(getFollowedPostsAction());
            }}
          />
        )}
      </View>
      <View>
        <GestureDetector gesture={tap}>
          <Image style={styles.postImage} source={{ uri: `http://192.168.3.127:3001/posts/${post.image}` }} />
        </GestureDetector>

      </View>

      <View style={styles.cardBottom}>
        <View style={styles.text}>
          <Text style={styles.username}>
            {post?.User?.name}
          </Text>
          <Text>
            {post?.text}
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
              {postLikes?.length}
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

          {route.name === 'OnePostScreen' ? (
            <View style={styles.rightButtons}>
              <TouchableOpacity
                style={styles.edit}
              >
                <Feather name="edit" size={24} color="green" />
              </TouchableOpacity>
              <View style={{ position: 'relative' }}>
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => setShowModal(true)}
                >
                  <MaterialIcons name="delete-outline" size={27} color="red" />
                </TouchableOpacity>
                <View>
                  <Modal
                    visible={showModal}
                  >
                    <Card disabled style={styles.modalWindow}>
                      <View style={styles.commentActions}>
                        <Text style={[gStyle.title, { textAlign: 'center' }]}>
                          Are you sure you want to delete this post?
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={[gStyle.btn, { width: 70, marginTop: 20 }]}>
                          <Button
                            title="Yes"
                            onPress={() => {
                              setShowModal(false);
                              dispatch(deletePostAction(post.id));
                              navigation.navigate('ProfileScreen');
                            }}
                          />
                        </View>
                        <View style={[gStyle.btn, { width: 70, marginTop: 20 }]}>
                          <Button
                            title="No"
                            onPress={() => setShowModal(false)}
                          />
                        </View>
                      </View>
                    </Card>
                  </Modal>
                </View>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.bookmark}
              onPress={() => {
                if (!faves.find((el) => el.postId === post.id)) {
                  dispatch(addFavesAction(post.id));
                  dispatch(getFavesAction());
                  setFaved(true);
                } else {
                  dispatch(deleteFavesAction(post.id));
                  dispatch(getFavesAction());
                  setFaved(false);
                }
              }}
            >
              <Feather name="bookmark" size={25} color={faved ? 'red' : 'black'} />
            </TouchableOpacity>
          )}

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
  modalWindow: {
    borderRadius: 30,
    marginTop: 500,
  },
  rightButtons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 5,
  },
  delete: {
    marginLeft: 5,
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
