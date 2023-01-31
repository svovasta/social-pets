import React, { useEffect } from 'react';
import {
  Button, Image, Text, View, StyleSheet, SafeAreaView,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePostsAction } from '../../../redux/Slices/onePostSlice';
import { deletePostAction } from '../../../redux/Slices/postsSlice';

const styles = StyleSheet.create({
  photo: {
    width: 350,
    height: 350,
  },
  cont: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
    marginTop: 30,
  },
  descr: {
    marginTop: 10,
    fontSize: 15,

  },
});

export default function PostPage({ route }) {
  const post = { image: 'https://static01.nyt.com/images/2022/11/29/science/00tb-cats1/00tb-cats1-mediumSquareAt3X.jpg', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' };
  const { postId } = route.params;
  const ifFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onePost = useSelector((state) => state.onePost);
  useEffect(() => {
    dispatch(getOnePostsAction(postId));
    console.log('==============ONE POST==============');
    console.log(onePost);
    console.log('====================================');
  }, []);
  return (
    <SafeAreaView style={styles.cont}>

      <Image
        style={styles.photo}
        source={{ uri: `http://192.168.3.127:3001/posts/${onePost.image}` }}
      />
      <Text style={styles.descr}>
        {onePost.text}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20 }}>
          <Feather name="edit" size={24} color="black" />
          <Text style={{ marginTop: 5 }}>Редактировать</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', marginTop: 20 }}
          onPress={() => {
            dispatch(deletePostAction(postId));
            navigation.navigate('ProfileScreen');
          }}
        >
          <AntDesign name="delete" size={24} color="red" />
          <Text style={{ marginTop: 5 }}>Удалить</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
// });
