import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function DiscussionCard({ discussion }) {
  return (
    <View>
      <Text>{discussion.title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({

});
