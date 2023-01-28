import {
  StyleSheet, Text, View, SafeAreaView,
} from 'react-native';
import React from 'react';
import PhotoCard from '../../UI/PhotoCard';
import { gStyle } from '../../../styles/styles';

export default function FavouritesPage() {
  const faves = [{ img: 'https://static01.nyt.com/images/2022/11/29/science/00tb-cats1/00tb-cats1-mediumSquareAt3X.jpg' },
    { img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1144982182.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=1200:*' },
    { img: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg' }];
  return (
    <SafeAreaView style={[gStyle.main]}>
      <Text style={[gStyle.gText, { textAlign: 'center', fontSize: 24 }]}>
        Favourite Posts
      </Text>
      <View style={styles.posts}>
        {faves.map((el) => <PhotoCard key={faves.indexOf(el)} photo={el} />)}
      </View>
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
