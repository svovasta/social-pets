import { useNavigation, useRoute } from '@react-navigation/native';
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
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { auth, database } from '../../../../config/firebase';
import defaultAvatar from '../../../../assets/defaultavatar.png';

export default function DiscussionPage(props) {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const userExpres = useSelector((state) => state.user);
  console.log(userExpres, '-------');
  useLayoutEffect(() => {
    const collectionRef = collection(database, `${route.params.item.title}`);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log('snapshot', snapshot);
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });
    return unsubscribe;
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
        avatar: userExpres.avatar ? (`http://localhost:3001/user/${userExpres.avatar}`) : (defaultAvatar),
        name: userExpres.name,
      }}
      messagesContainerStyle={{
        backgroundColor: '#fff ',
      }}
      renderUsernameOnMessage
    />
  );
}
