import React, { useEffect } from 'react';
import {
  StyleSheet, SafeAreaView, View, Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscussionsAction } from '../../../redux/Slices/discussionsSlice';
import DiscussionCard from '../../UI/DiscussionCard/DiscussionCard';
import topImg from '../../../../assets/Discussions/topDisc.png';

export default function AllDiscussionsPage({ navigation }) {
  const discussions = useSelector((state) => state.discussions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiscussionsAction());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={topImg}
        style={{
          width: '100%', height: 90, position: 'absolute', top: 7,
        }}
      />
      <View style={{
        borderTopStartRadius: 50, height: '90%', justifyContent: 'space-around', marginTop: 50,
      }}
      >
        {discussions?.map((discussion) => (
          <DiscussionCard
            key={discussion.id}
            item={discussion}
            navigation={navigation}
          />
        ))}
      </View>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#FFF8DC',
    height: '100%',
  },
});
