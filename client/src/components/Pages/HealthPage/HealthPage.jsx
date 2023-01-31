import {
  StyleSheet, Text, View,
  Modal,
  TouchableOpacity, Button, Alert, SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Formik } from 'formik';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addCheckupAction, getCheckupsActon } from '../../../redux/Slices/checkUpSlice';

export default function HealthPage() {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState({});
  const [dates, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const checkups = useSelector((s) => s.checkups);

  // const user = useSelector((s) => s.user);

  // useEffect(() => {
  //   getCheckupsActon();
  //   Alert.alert('VOILA');
  // }, [user]);

  const newData = checkups.reduce((acc, curr) => {
    const { date, name, description } = curr;
    acc[date] = [{ name, description }];
    return acc;
  }, {});

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCheckupsActon();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = (day) => {
    for (let i = -15; i < 85; i += 1) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!newData[strTime]) {
        newData[strTime] = [];
        newData[strTime].push({
          name: newData.name,
          description: newData.description,
        });
      }
    }
    const newItems = {};
    Object.keys(newData).forEach((key) => {
      newItems[key] = newData[key];
    });
    setItems(newItems);
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
            <Text>{item.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    // <ScrollView
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }
    // >
    <>

      <Agenda
        selected={new Date()}
        loadItemsForMonth={loadItems}
        maxDate="2023-12-31"
        minDate="2020-12-31"
        items={items}
        renderItem={renderItem}
        onDayPress={(res) => {
          setDate(res.dateString);
          setShowModal(!showModal);
        }}
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'black',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
      />
      <Button title="Add" onPress={() => setShowModal(!showModal)} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <Text style={{ textAlign: 'center', marginTop: 100 }}>Add a checkup</Text>
        <Formik
          initialValues={{ name: '', description: '', date: dates }}
          onSubmit={(values) => dispatch(addCheckupAction(values))}
        >
          {(props) => (
            <View>
              <TextInput
                style={styles.input1}
                value={dates}
              />
              <TextInput
                style={styles.input1}
                placeholder="Name"
                onChangeText={props.handleChange('name')}
                value={props.values.name}
              />
              <TextInput
                style={styles.input2}
                placeholder="Description"
                value={props.values.description}
                onChangeText={props.handleChange('description')}
              />
              <Button
                title="Add note"
                onPress={() => {
                  props.handleSubmit();
                  setShowModal(!showModal);
                }}
              />
              <Button
                title="Back"
                onPress={() => {
                  setShowModal(!showModal);
                }}
              />
            </View>
          )}
        </Formik>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  input1: {
    borderWidth: 1,
    marginTop: 20,
    padding: 15,
    marginVertical: 30,
    marginHorizontal: '20%',
    width: '60%',
    borderColor: 'silver',
    borderRadius: 5,
  },
  input2: {
    borderWidth: 1,
    marginTop: 20,
    padding: 15,
    marginVertical: 30,
    marginHorizontal: '20%',
    width: '60%',
    borderColor: 'silver',
    borderRadius: 5,
  },
});
