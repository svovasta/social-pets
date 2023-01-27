import {
  StyleSheet, Text, View, Arrow,
} from 'react-native';
import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function HealthPage() {
  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
});
