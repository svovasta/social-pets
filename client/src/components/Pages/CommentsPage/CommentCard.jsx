import React from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from '@ui-kitten/components';
import logo from '../../../../assets/favicon.png';

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


export default function CommentCard({ comment, activePostId }) {
  return (
    <View style={styles.card}>
      <View style={styles.topContainer}>
        <Avatar style={styles.avatar} source={logo} />
        <Text style={styles.username}>{comment.User.name}</Text>
      </View>
      <Text style={styles.descr}>
        {comment.text}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20 }}>
          <Feather name="edit" size={24} color="black" />
          <Text style={{ marginTop: 5 }}>Редактировать</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20 }}>
          <AntDesign name="delete" size={24} color="red" />
          <Text style={{ marginTop: 5 }}>Удалить</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
