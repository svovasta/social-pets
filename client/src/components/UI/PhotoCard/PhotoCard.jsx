import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image, StyleSheet, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  photo: {
    width: 125,
    height: 125,
  },
});

export default function PhotoCard({ photo }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginRight: 2, marginBottom: 2 }}>
      <TouchableOpacity onPress={() => navigation.navigate('OnePostScreen', { postId: photo.id })}>
        <Image
          style={styles.photo}
          source={{ uri: `http://localhost:3001/posts/${photo.image}` }}
        />
      </TouchableOpacity>
    </View>
  );
}
