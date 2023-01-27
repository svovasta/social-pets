import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  photo: {
    width: 130,
    height: 130,
  },
});

export default function PhotoCard({ photo }) {
  return (
    <View>
      <Image
        style={styles.photo}
        source={{ uri: photo.img }}
      />
    </View>
  );
}
