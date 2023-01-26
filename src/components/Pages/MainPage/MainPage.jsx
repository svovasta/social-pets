import React from 'react';
import { Button, Text, View } from 'react-native';
import { gStyle } from '../../../styles/styles';

export default function MainPage({ navigation }) {
  const loadScene = () => {
    navigation.navigate('AddPostPage');
  };
  return (
    <View style={gStyle.main}>
      <Text style={gStyle.title}>Главная страница</Text>
      <Button title="Открыть страницу" onPress={loadScene} />
    </View>
  );
}
