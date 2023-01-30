import { useRoute } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function DiscussionPage(props) {
  const route = useRoute();
  useEffect(() => { console.log(props, '--------'); }, []);
  console.log(route.params, 'route ----- ');
  return (
    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        {props.route.params.item.title}
      </Text>
      <Button title="back" onPress={() => props.navigation.navigate('Discussions')} />
    </SafeAreaView>

  );
}
