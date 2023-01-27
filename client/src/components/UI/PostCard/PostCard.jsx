import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import {
  Card, Avatar,
} from '@ui-kitten/components';
import { AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import logo from '../../../../assets/favicon.png';

export default function PostCard({ post }) {
  return (
    <Card style={styles.card}>

      <View style={styles.topContainer}>
        <Avatar style={styles.avatar} source={logo} />
        <Text>{post.username}</Text>
      </View>

      <View>
        <Text>
          {post.text}
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

    </Card>
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
  heart: {
    marginRight: 15,
  },
  card: {
    margin: 5,
  },
  comment: {
    display: 'flex',
    justifySelf: 'end',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 3,
    padding: 10,
  },
  bookmark: {
    display: 'flex',
    justifySelf: 'flex-end',
    marginLeft: 220,
  },
});
