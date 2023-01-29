import {
  StyleSheet, Text, View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';

export default function HealthPage() {
  // const [showModal, setShowModal] = useState(false);
  // const [items, setItems] = useState(checkups);

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  const checkups = [{ name: 'item 1 - any js object', date: '2023-01-30' },
    { name: 'item 1 - any js object', date: '2023-01-29' }];

  const loadItems = (day) => {
    // for (let i = -15; i < 85; i++) {
    // const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    // const strTime = timeToString(time);
    // console.log(strTime);
    if (!checkups.date) {
      checkups.date = [];
      checkups.date.push({
        name: 'k',
      });
    }
    // const newItems = {};
    // Object.keys(items).forEach((key) => {
    //   newItems[key] = items[key];
    // });
    // setItems(newItems);
  };

  const renderItem = (item) => (
    <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>{item.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        selected={new Date()}
        loadItemsForMonth={loadItems}
        maxDate="2023-12-31"
        renderItem={renderItem}
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}

      />
    </View>
  );
}
