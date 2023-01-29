import React, { useEffect, useState } from 'react';
import {
  Button, Image, Text, View, SafeAreaView, StyleSheet, Touchable,
} from 'react-native';
import { Feather, Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import PhotoCard from '../../UI/PhotoCard';
import { userLogoutAction, findUserAction } from '../../../redux/Slices/userSlice';
import { gStyle } from '../../../styles/styles';

export default function ProfilePage({ navigation }) {
  const photos = [{ img: 'https://static01.nyt.com/images/2022/11/29/science/00tb-cats1/00tb-cats1-mediumSquareAt3X.jpg' },
    { img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1144982182.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=1200:*' },
    { img: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg' },
    { img: 'data:image/jpeg;base64,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' },
    { img: 'data:image/jpeg;base64,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' },
    { img: 'https://media.wired.com/photos/5932599a26780e6c04d2b1a7/master/w_2560%2Cc_limit/rat1.jpg' }];

  const dispatch = useDispatch();
  const [postsCount, setPostsCount] = useState(false);
  const user = useSelector((state) => state.user);
  console.log('USERUSERUSERUSERUSERSUERSSUEURSUEU');
  console.log(user);
  console.log('USERUSERUSERUSERUSERSUERSSUEURSUEU');

  useEffect(() => {
    dispatch(findUserAction());
  }, []);

  return (
    <SafeAreaView style={gStyle.main}>
      <View style={styles.profileRow}>
        <View>
          <Image
            style={styles.avatar}
            source={(require('../../../../assets/favicon.png'))}
          />
        </View>

        <Text style={styles.profileText}>
          {user.Posts?.length}
          {'\n'}
          {user.Posts?.length % 10 === 1 ? (
            <Text>
              Post
            </Text>
          )
            : (
              <Text>
                Posts
              </Text>
            )}

        </Text>
        <Text style={styles.profileText}>
          15
          {'\n'}
          Comments
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
          <Feather style={{ marginRight: 10, marginTop: 5 }} name="settings" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(userLogoutAction())}>
          <Octicons name="sign-out" size={24} color="black" style={{ marginRight: 10, marginTop: 5 }} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{ margin: 10, fontSize: 20 }}>{user.name}</Text>
        <Text style={{ marginLeft: 10, fontSize: 20 }}>Bio</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button title="My Posts" />
        <Button title="Favourites" onPress={() => navigation.navigate('FavouritesScreen')} />
      </View>

      <View style={styles.posts}>
        {photos.map((el) => <PhotoCard key={photos.indexOf(el)} photo={el} />)}
      </View>

      <View />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 20,
    justifyContent: 'space-around',
  },
  profileInfo: {
    margin: 20,
  },
  posts: {
    marginLeft: '3%',
    marginRight: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
