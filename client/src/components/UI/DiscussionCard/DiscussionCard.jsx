import React, { useEffect } from 'react';
import {
  Text, View, StyleSheet, Button, Touchable, TouchableOpacity, SafeAreaView,

} from 'react-native';

export default function DiscussionCard(props) {
  useEffect(() => { console.log(props.item); }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => props.navigation.navigate(
          'Discussion',
          { item: props.item },
        )}
      >
        <Text>
          {props.item.title}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 249, 166, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderRadius: 25,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgb(216, 227, 232)',
    width: '100%',
    height: '20%',
    alignItems: 'center',
  },
});
