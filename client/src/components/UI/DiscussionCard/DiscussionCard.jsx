import React, { useEffect } from 'react';
import {
  Text, View, StyleSheet, Button, Touchable, TouchableOpacity, SafeAreaView, Image,

} from 'react-native';
import walking from '../../../../assets/Discussions/walking.png';
import care from '../../../../assets/Discussions/care.png';
import over from '../../../../assets/Discussions/over.png';
import char from '../../../../assets/Discussions/char.png';
import random from '../../../../assets/Discussions/random.png';

export default function DiscussionCard(props) {
  let image;
  switch (props.item.title) {
    case 'Walking Together':
      image = walking;
      break;
    case 'Pets Care & Health':
      image = care;
      break;
    case 'Overstaying':
      image = over;
      break;
    case 'Charity':
      image = char;
      break;
    case 'Random talk':
      image = random;
      break;
    default:
      console.log('kek');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={image}
        style={{
          height: 50,
          width: 50,
          marginBottom: -40,
          marginRight: 20,
        }}
      />
      <TouchableOpacity
        style={styles.card}
        onPress={() => props.navigation.navigate(
          'Discussion',
          { item: props.item },
        )}
      >
        <Text style={{
          fontWeight: 'bold',
          color: '#FFF8DC',
          fontSize: 18,
        }}
        >
          {props.item.title}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#A0522D',
    height: 58,
    borderRadius: 10,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF8DC',
    width: '100%',
    height: '17%',
    alignItems: 'center',
  },
});
