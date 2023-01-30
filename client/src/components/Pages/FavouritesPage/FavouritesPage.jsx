import {
  StyleSheet, Text, View, SafeAreaView, RefreshControl, ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotoCard from '../../UI/PhotoCard';
import { gStyle } from '../../../styles/styles';
import { getFavesAction } from '../../../redux/Slices/faveSlice';

export default function FavouritesPage() {
  const [refreshing, setRefreshing] = useState(false);
  const faves = useSelector((s) => s.faves);
  const dispatch = useDispatch();

  console.log(faves);

  useEffect(() => {
    dispatch(getFavesAction());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getFavesAction());
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >

        <Text style={[gStyle.gText, { textAlign: 'center', fontSize: 24 }]}>
          Favourite Posts
        </Text>
        <View style={styles.posts}>
          {faves?.map((el) => <PhotoCard key={el.id} photo={el} />)}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileText: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  profileInfo: {
    margin: 20,
  },
  posts: {
    marginTop: 40,
    marginLeft: '3%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
