import {
  StyleSheet, Text, View,
  Modal,
  TouchableOpacity, Button, Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItem } from '@ui-kitten/components';
import { addCheckupAction, getCheckupsActon } from '../../../redux/Slices/checkUpSlice';
import WelcomeNotes from '../WelcomeNotes';

export default function HealthPage() {
  const [showModal, setShowModal] = useState(false);
  const [dates, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const checkups = useSelector((s) => s.checkups);

  useEffect(() => {
    dispatch(getCheckupsActon());
  }, []);

  const newData = checkups.reduce((acc, curr) => {
    const { date } = curr;
    acc[date] = {
      marked: true, selected: true, selectedColor: 'blue', dotColor: 'pink',
    };
    return acc;
  }, {});

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCheckupsActon();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.date.split('-').reverse().join('/')} ${item.name}`}
      description={`${item.description}`}
    />
  );

  return (
    <>
      <View>
        <Calendar
          style={{ marginTop: 80 }}
          minDate="2010-05-10"
          maxDate="2060-05-30"
          onDayPress={(res) => {
            setDate(res.dateString);
            setShowModal(!showModal);
          }}
          monthFormat="dd MM yyyy"
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          firstDay={1}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableAllTouchEventsForDisabledDays
          enableSwipeMonths
          markingType="dot"
          markedDates={newData}
        />
      </View>
      <Button title="Add" onPress={() => setShowModal(!showModal)} />

      <List
        data={checkups}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />

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
                placeholder="Название"
                onChangeText={props.handleChange('name')}
                value={props.values.name}
              />
              <TextInput
                style={styles.input2}
                placeholder="Описание"
                value={props.values.description}
                onChangeText={props.handleChange('description')}
              />
              <Button
                title="Добавить checkup"
                onPress={() => {
                  props.handleSubmit();
                  setShowModal(!showModal);
                }}
              />
              <Button
                title="Назад"
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
