import React, { useEffect } from 'react';
import {
  FlatList, Text, View, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscussionsAction } from '../../../redux/Slices/discussionsSlice';
import DiscussionCard from '../../UI/DiscussionCard/DiscussionCard';

export default function DiscussionsPage() {
  const discussions = useSelector((state) => state.discussions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiscussionsAction());
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={discussions}
        renderItem={({ item }) => (
          <DiscussionCard discussion={item} />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
  },
});
