import React from 'react';
import {
  StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image,
} from 'react-native';
import {
  Card, Avatar,
} from '@ui-kitten/components';
import { AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import logo from '../../../../assets/favicon.png';

export default function PostCard({ post }) {
  return (
    <SafeAreaView style={styles.card}>

      <View style={styles.topContainer}>
        <Avatar style={styles.avatar} source={logo} />
        <Text style={styles.username}>{post.User.name}</Text>
      </View>
      <View>
        <Image style={styles.postImage} source={{ uri: post.image }} />

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
          <TouchableOpacity>
            <AntDesign style={styles.heart} name="hearto" size={25} color="red" />
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
  heart: {
    marginRight: 15,
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
