import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Pressable,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import {
  Card, Modal, Avatar,
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../../../assets/defaultavatar.png';

export default function CommentCard({ comment }) {
  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.topContainer}>
        <Avatar
          style={styles.avatar}
          source={user.avatar ? ({ uri: `http://192.168.3.127:3001/user/${comment.User.avatar}` }) : (defaultAvatar)}
        />
        <Text style={styles.username}>{comment.User.name}</Text>
        <View style={styles.more}>
          <View>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Feather name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalWindow}>
            <Modal visible={visible}>
              <Card disabled>
                <View>
                  <TouchableOpacity>
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
                <Pressable onPress={() => setVisible(false)}>
                  <Text>Close</Text>
                </Pressable>
              </Card>
            </Modal>
          </View>
        </View>
      </View>
      <Text style={styles.commentText}>
        {comment.text}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft: '5%',
    marginBottom: 10,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 10,
    fontWeight: '700',
  },
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
  commentText: {
    marginTop: 2,
    alignItems: 'flex-start',
    marginLeft: '13%',
    // maxWidth: 300,
    // width: 1,
    flexWrap: 'wrap',
  },
  more: {
    position: 'relative',
    left: 230,
  },
  modalWindow: {
    position: 'absolute',
    top: '30%',
    left: '65%',
  },
});
