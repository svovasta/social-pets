import {
  StyleSheet, SafeAreaView,
} from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { gStyle } from '../../../styles/styles';

export default function HealthPage() {
  return (
    <SafeAreaView style={gStyle.main}>
      <Calendar
        minDate="2010-05-10"
        maxDate="2060-05-30"
        onDayPress={(day) => {
          console.log('selected day', day);
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
        markedDates={{
          '2022-01-10': {
            marked: true, dotColor: 'pink', selected: true,
          },
        }}
      />
    </SafeAreaView>
  );
}
