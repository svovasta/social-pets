import React, { useEffect } from 'react';
import {
  Text, View, StyleSheet, SafeAreaView,
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
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      {discussions?.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          item={discussion}
          navigation={navigation}
        />
      ))}
      <Text onPress={() => navigation.navigate('Discussion')}>lol</Text>

    </SafeAreaView>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
// });
