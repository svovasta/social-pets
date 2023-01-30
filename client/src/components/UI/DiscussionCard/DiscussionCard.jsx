import React, { useEffect } from 'react';
import {
  Text, View, StyleSheet, Button, Touchable, TouchableOpacity,
} from 'react-native';

export default function DiscussionCard(props) {
  useEffect(() => { console.log(props.item); }, []);
  return (
    <TouchableOpacity
      style={{ width: 200, height: 100 }}
      onPress={() => props.navigation.navigate(
        'Discussion',
        { item: props.item },
      )}
    >
      <Text>
        {props.item.title}
      </Text>
      <Text>Ну и хулИ???</Text>
    </TouchableOpacity>
  );
}  
// const styles = StyleSheet.create({
//   card: {
//     fontSize: 'bold',
//     backgroundColor: 'red',
//     textAlign: 'center',
//   },
// });
