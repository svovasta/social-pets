import React, { useEffect, useState } from 'react';
import {
  Button, Image, Text, View, StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Modal } from '@ui-kitten/components';
import { getOnePostsAction } from '../../../redux/Slices/onePostSlice';
import { deletePostAction } from '../../../redux/Slices/postsSlice';
import { gStyle } from '../../../styles/styles';
import PostCard from '../../UI/PostCard';

export default function PostPage({ route }) {
  const { postId } = route.params;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const onePost = useSelector((state) => state.onePost);
  useEffect(() => {
    dispatch(getOnePostsAction(postId));
  }, []);
  return (
    <PostCard post={onePost} />
    // <SafeAreaView style={styles.cont}>

  //   <Image
  //     style={styles.photo}
  //     source={{ uri: `http://192.168.3.127:3001/posts/${onePost.image}` }}
  //   />
  //   <Text style={styles.descr}>
  //     {onePost.text}
  //   </Text>

  //   <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //     <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20 }}>
  //       <Feather name="edit" size={24} color="black" />
  //       <Text style={{ marginTop: 5 }}>Редактировать</Text>
  //     </TouchableOpacity>

  //     <TouchableOpacity
  //       style={{ flexDirection: 'row', marginTop: 20, position: 'relative' }}
  //       onPress={() => {
  //         setShowModal(true);
  //         // dispatch(deletePostAction(postId));
  //         // navigation.navigate('ProfileScreen');
  //       }}
  //     >
  //       <AntDesign name="delete" size={24} color="red" />
  //       <Text style={{ marginTop: 5 }}>Удалить</Text>
  //       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //         <Modal
  //           visible={showModal}
  //         >
  //           <Card disabled style={styles.modalWindow}>
  //             <View style={styles.commentActions}>
  //               <Text style={[gStyle.title, { textAlign: 'center' }]}>
  //                 Are you sure you want to delete this post?
  //               </Text>
  //             </View>
  //             <View style={{ flexDirection: 'row' }}>
  //               <View style={[gStyle.btn, { width: 70, marginTop: 20 }]}>
  //                 <Button
  //                   title="Yes"
  //                   onPress={() => setShowModal(false)}
  //                 />
  //               </View>
  //               <View style={[gStyle.btn, { width: 70, marginTop: 20 }]}>
  //                 <Button
  //                   title="No"
  //                   onPress={() => setShowModal(false)}
  //                 />
  //               </View>
  //             </View>
  //           </Card>
  //         </Modal>
  //       </View>
  //     </TouchableOpacity>
  //   </View>

  // </SafeAreaView>
  );
}

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
  modalWindow: {
    borderRadius: 20,
    top: 100,
  },
});
