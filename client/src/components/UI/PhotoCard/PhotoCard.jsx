import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image, StyleSheet, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  photo: {
    width: 130,
    height: 130,
  },
});

export default function PhotoCard({ photo }) {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('OnePostScreen', { postId: photo.id })}>
        <Image
          style={styles.photo}
          source={{ uri: `http://192.168.3.127:3001/posts/${photo.image}` }}
        />
      </TouchableOpacity>
    </View>
  );
}
