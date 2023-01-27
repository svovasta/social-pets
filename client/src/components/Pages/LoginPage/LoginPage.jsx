import { Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
// import { useDispatch } from 'react-redux';

export default function LoginPage() {
  // const dispatch = useDispatch();
  return (
    <View>
      <Text>LoginPage</Text>
      <Input
        placeholder="Email..."
        name="email"
        type="email"
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
      />
    </View>
  );
}
