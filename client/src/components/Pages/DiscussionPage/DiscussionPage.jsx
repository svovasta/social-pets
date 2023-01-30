import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  collection, addDoc, orderBy, query, onSnapshot,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import {
  SafeAreaView, Text, View, TouchableOpacity,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../../../../config/firebase';

export default function DiscussionPage(props) {
  const route = useRoute();
  useEffect(() => { console.log(props, '--------'); }, []);
  console.log(route.params, 'route ----- ');

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.error(error));
  };

  useLayoutEffect(() => {
    const collectionRef = collection(database, `${route.params.item.title}`);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log('snapshot', snapshot);
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const {
      _id, createdAt, text, user,
    } = messages[0];
    addDoc(collection(database, `${route.params.item.title}`), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      }}
      messagesContainerStyle={{
        backgroundColor: '#fff ',
      }}
    />
  );
}
