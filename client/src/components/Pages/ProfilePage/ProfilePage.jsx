import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Image, Text, View, SafeAreaView, StyleSheet, ScrollView, RefreshControl, Modal, Pressable,
} from 'react-native';
import { Feather, Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import PhotoCard from '../../UI/PhotoCard';
import { removeUserFirestorm } from '../../../redux/Slices/userFirestormSlice';
import { gStyle } from '../../../styles/styles';
import defaultAvatar from '../../../../assets/defaultavatar.png';
import { findUserAction, userLogoutAction } from '../../../redux/Slices/userSlice';
import { getMyPostsAction } from '../../../redux/Slices/myPostsSlice';
import { getFavesAction } from '../../../redux/Slices/faveSlice';

export default function ProfilePage({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [changeAvatarStatus, setChangeAvatarStatus] = useState(false);
  const user = useSelector((state) => state.user);
  const myPosts = useSelector((state) => state.myPosts);

  useEffect(() => {
    dispatch(findUserAction());
    dispatch(getMyPostsAction());
    dispatch(getFavesAction());
  }, [isFocused]);

  useEffect(() => {
    if (avatar.length) {
      setChangeAvatarStatus(!changeAvatarStatus);
    }
  }, [avatar]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(findUserAction());
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const logOutEveryMode = () => {
    dispatch(userLogoutAction());
    dispatch(removeUserFirestorm());
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('avatar', {
      name: `${new Date().getTime()}`,
      uri: avatar,
      type: 'image/jpg',
    });

    try {
      await axios.post('/user/upload-avatar', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      setChangeAvatarStatus(false);
      dispatch(findUserAction());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={gStyle.main}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.profileRow}>
          <View>
            <TouchableOpacity
              onPress={
              pickImage
}
              onLongPress={() => setShowModal(true)}
            >
              <Image
                style={styles.avatar}
                source={user.avatar ? ({ uri: `http://192.168.3.127:3001/user/${user.avatar}` }) : (defaultAvatar)}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileText}>
            {user?.Posts?.length}
            {'\n'}
            {user?.Posts?.length % 10 === 1 ? (
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
            {user?.Comments?.length}
            {'\n'}
            {user?.Comments?.length % 10 === 1 ? (
              <Text>
                Comment
              </Text>
            )
              : (
                <Text>
                  Comments
                </Text>
              )}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
            <Feather style={{ marginRight: 10, marginTop: 5 }} name="settings" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={logOutEveryMode}>
            <Octicons name="sign-out" size={24} color="black" style={{ marginRight: 10, marginTop: 5 }} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ alignItems: 'flex-start' }}>
            {changeAvatarStatus && (
            <Button
              title="Save changes"
              onPress={() => {
                uploadImage();
                setAvatar('');
              }}
            />
            )}

          </View>
          <Text style={{ margin: 10, marginLeft: 20, fontSize: 20 }}>{user.name}</Text>
          <Text style={{ marginLeft: 20, fontSize: 20 }}>{user.description}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title="Favourites" onPress={() => navigation.navigate('FavouritesScreen')} />
        </View>
        <View style={styles.posts}>
          {myPosts.map((el) => <PhotoCard key={el.id} photo={el} style={{ marginRight: 20 }} />)}
        </View>
        <View />
      </ScrollView>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <SafeAreaView style={styles.centeredView}>
            <View style={styles.modalView}>
              {user.avatar ? (
                <Image source={{ uri: `http://192.168.3.127:3001/user/${user.avatar}` }} style={{ width: 400, height: 400, marginBottom: 20 }} />) : (
                  <Image source={defaultAvatar} style={{ width: 400, height: 400, marginBottom: 20 }} />)}
              <Pressable
                style={[gStyle.btn, styles.buttonClose]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.textStyle}>Hide</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  buttonClose: {
    width: 70,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(216, 227, 232)',
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
    marginLeft: 10,
  },
});
