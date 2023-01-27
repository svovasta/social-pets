import React, { useState } from 'react';
import { Input, Button } from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../redux/Slices/userSlice';

export default function LoginPage() {
  const [input, setInput] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = () => {
    dispatch(loginAction(input));
  };

  return (
    <View>
      <Text>LoginPage</Text>
      <Input
        placeholder="Email..."
        name="email"
        type="email"
        value={input.email}
        onChange={changeHandler}
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        value={input.password}
        onChange={changeHandler}
      />
      <Button onPress={(e) => submitHandler(e)}>
        BUTTON
      </Button>
    </View>
  );
}
