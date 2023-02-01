import React, { useEffect } from 'react';
import {
  StyleSheet, SafeAreaView, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscussionsAction } from '../../../redux/Slices/discussionsSlice';
import DiscussionCard from '../../UI/DiscussionCard/DiscussionCard';

export default function AllDiscussionsPage({ navigation }) {
  const discussions = useSelector((state) => state.discussions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiscussionsAction());
  }, []);
  return (
    <View style={styles.container}>
      {discussions?.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          item={discussion}
          navigation={navigation}
        />
      ))}
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
  },
});
