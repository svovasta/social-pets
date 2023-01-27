import { useNavigation } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import React from 'react';
import {
  Image, StyleSheet, Text, View,
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
      <TouchableOpacity onPress={() => navigation.navigate('PostPage')}>
        <Image
          style={styles.photo}
          source={{ uri: photo.img }}
        />
      </TouchableOpacity>
    </View>
  );
}
