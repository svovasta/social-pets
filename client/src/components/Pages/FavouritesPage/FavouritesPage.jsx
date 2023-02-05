import {
  StyleSheet, Text, View, SafeAreaView, RefreshControl, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import PhotoCard from '../../UI/PhotoCard';
import { gStyle } from '../../../styles/styles';
import { getFavesAction } from '../../../redux/Slices/faveSlice';
import topImg from '../../../../assets/Discussions/topDisc.png';

export default function FavouritesPage() {
  const [refreshing, setRefreshing] = useState(false);
  const faves = useSelector((s) => s.faves);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getFavesAction());
  }, [isFocused]);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   dispatch(getFavesAction());
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1500);
  // }, []);

  return (
    <View style={gStyle.main}>
      {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      > */}
      <Image
        source={topImg}
        style={{
          width: '100%', height: 90, resizeMode: 'cover',
        }}
      />
      <Text style={[gStyle.gText, { textAlign: 'center', fontSize: 24, marginTop: 20 }]}>
        Favourite Posts
      </Text>

      <View style={styles.cont}>
        {faves?.map((el) => (
          <TouchableOpacity key={el.id} onPress={() => navigation.navigate('PostPage')}>
            <Image
              style={styles.photo}
              source={{ uri: `http://localhost:3001/posts/${el.Post.image}` }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  photo: {
    width: 130,
    height: 130,
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
