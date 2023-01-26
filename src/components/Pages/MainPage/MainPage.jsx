import React, { useState } from 'react';
import {
  Button, View, FlatList, RefreshControl,
} from 'react-native';
import { gStyle } from '../../../styles/styles';
import PostCard from '../../UI/PostCard';

export default function MainPage({ navigation }) {
  const loadScene = () => {
    navigation.navigate('AddPostPage');
  };

  const [posts, setPosts] = useState([
    { username: 'Vova', text: 'Text' },
    { username: 'Zarina', text: 'Text2' },
    { username: 'Lesha', text: 'Text3' },
    { username: 'Volodya', text: 'Text4' },
    { username: 'Vova', text: 'Text' },
    { username: 'Zarina', text: 'Text2' },
    { username: 'Lesha', text: 'Text3' },
    { username: 'Volodya', text: 'Text4' },
  ]);
  return (
    <View style={gStyle.main}>
      <Text style={gStyle.title}>Главная страница</Text>
      <Button title="Открыть страницу" onPress={loadScene} />
      <Button title="Personal Profile" onPress={() => navigation.navigate('ProfilePage')} />

      <FlatList
        refreshControl={<RefreshControl />}
        data={posts}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
      />

    </View>
  );
}
