import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import {
  Card, Avatar,
} from '@ui-kitten/components';
import { AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import logo from '../../../../assets/favicon.png';

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>

      <View style={styles.topContainer}>
        <Avatar style={styles.avatar} source={logo} />
        <Text style={styles.username}>{post.User.name}</Text>
      </View>
      <View>
        <Image style={styles.postImage} source={{ uri: post.image }} />

      </View>

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
        <TouchableOpacity>
          <AntDesign style={styles.heart} name="hearto" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 style={styles.comment} name="comment" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="bookmark" size={25} color="black" style={styles.bookmark} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
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
    width: 340,
    height: 340,
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
  heart: {
    marginRight: 15,
  },
  card: {
    margin: 5,
    flex: 1,
  },
  comment: {
    display: 'flex',
    justifySelf: 'end',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  bookmark: {
    display: 'flex',
    justifySelf: 'flex-end',
    marginLeft: 250,
  },
});
