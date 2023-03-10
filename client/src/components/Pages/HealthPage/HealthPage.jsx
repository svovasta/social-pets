import {
  StyleSheet, Text, View,
  Modal,
  TouchableOpacity, Button, Alert, Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItem } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { addCheckupAction, deleteCheckUpAction, getCheckupsActon } from '../../../redux/Slices/checkUpSlice';
import mp from '../../../../assets/Discussions/mp.png';

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
      marked: true, selected: true, selectedColor: '#58ceb2', dotColor: 'grey',
    };
    return acc;
  }, {});

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: '#FFF8DC' }}>
      <ListItem
        style={{ backgroundColor: '#FFF8DC', fontSize: 20 }}
        title={(
          <Text>
            {item.date.split('-').reverse().join('/')}
            {' '}
            {item.name}
            {' '}
          </Text>
        )}
        description={`${item.description}`}
        accessoryRight={(
          <Button
            title="delete"
            onPress={() => {
              dispatch(deleteCheckUpAction(item.id));
              dispatch(getCheckupsActon());
            }}
          />
)}
      />
    </View>
  );
  return (
    <View style={{ backgroundColor: '#FFF8DC', height: '100%' }}>
      <View>
        <Image
          source={mp}
          style={{
            width: '100%', height: 90, resizeMode: 'cover',
          }}
        />
        <Calendar
          style={{ marginTop: 80, backgroundColor: '#FFF8DC' }}
          theme={{ calendarBackground: '#FFF8DC' }}
          minDate="2010-05-10"
          maxDate="2060-05-30"
          onDayPress={(res) => {
            setDate(res.dateString);
            setShowModal(!showModal);
          }}
          monthFormat="dd MM yyyy"
          firstDay={1}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableAllTouchEventsForDisabledDays
          enableSwipeMonths
          markingType="dot"
          markedDates={newData}
        />
      </View>
      <View style={{ backgroundColor: '#FFF8DC' }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <TouchableOpacity style={styles.botton} onPress={() => setShowModal(!showModal)}>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>

        {!checkups.length ? (
          <Text style={{
            margin: 10,
            fontSize: 20,
            textAlign: 'center',
            font: 'Roboto',
            fontWeight: 'bold',
            backgroundColor: '#FFF8DC',
            color: '#8B4513',
          }}
          >
            Here you can keep track of your pet-related events, e.g. vet appointments, vaccinations etc. Just click on the date you want to add a note for.
          </Text>
        )
          : (
            <List
              data={checkups}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          )}
      </View>
      <Modal
        style={{ backgroundColor: '#FFF8DC', height: '100%' }}
        animationType="slide"
        transparent={false}
        visible={showModal}
      >
        <Image
          source={mp}
          style={{
            width: '100%', height: 95, position: 'absolute', top: 4,
          }}
        />
        <View style={{ marginTop: 80 }}>
          <Formik
            initialValues={{ name: '', description: '', date: dates }}
            onSubmit={(values) => dispatch(addCheckupAction(values))}
          >
            {(props) => (
              <View style={{ backgroundColor: '#FFF8DC', height: '100%' }}>
                <TextInput
                  style={styles.input1}
                  value={dates.split('-').reverse().join('/')}
                />
                <TextInput
                  style={styles.input1}
                  placeholder="Title"
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                />
                <TextInput
                  style={styles.input2}
                  placeholder="Description"
                  value={props.values.description}
                  onChangeText={props.handleChange('description')}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  <TouchableOpacity
                    style={styles.botton}
                    onPress={() => {
                      props.handleSubmit();
                      setShowModal(!showModal);
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                      Add a note
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  <TouchableOpacity
                    style={styles.botton}
                    onPress={() => setShowModal(!showModal)}

                  >
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                      Go back
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8DC',
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
  botton: {
    backgroundColor: 'rgba(160, 82, 45, 0.8)',
    height: 40,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
