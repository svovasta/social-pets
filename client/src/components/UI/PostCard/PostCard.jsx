import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image,
} from 'react-native';
import {
  Avatar,
} from '@ui-kitten/components';
import { AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import axios from 'axios';
import logo from '../../../../assets/corgi2.png';

export default function PostCard({ post }) {
  const [postLikes, setPostLikes] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
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

  return (
    <SafeAreaView style={styles.card}>

      <View style={styles.topContainer}>
        <Avatar style={styles.avatar} source={logo} />
        <Text style={styles.username}>{post.User.name}</Text>
      </View>
      <View>
        <Image style={styles.postImage} source={{ uri: `http://192.168.3.127:3001/posts/${post.image}` }} />

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
          <TouchableOpacity>
            <FontAwesome5 style={styles.comment} name="comment" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmark}>
            <Feather name="bookmark" size={25} color="black" />
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
