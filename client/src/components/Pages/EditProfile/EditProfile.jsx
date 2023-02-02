import {
  StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { gStyle } from '../../../styles/styles';
import { editProfileAction, findUserAction } from '../../../redux/Slices/userSlice';
import pattern from '../../../../assets/pattern.png';

export default function EditProfile({ navigation }) {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  return (
  // <SafeAreaView style={[gStyle.main, styles.container]}>
  //   <Formik
  //     initialValues={{ name: user.name, description: user.description }}
  //     onSubmit={(values) => {
  //       dispatch(editProfileAction(user.id, values));
  //       navigation.navigate('ProfileScreen');
  //     }}
  //   >
  //     {(props) => (
  //       <View>
  //         <View style={{ marginTop: 30, alignItems: 'center' }}>
  //           <View>
  //             <Text style={[gStyle.gText, { textAlign: 'center' }]}>
  //               Name
  //             </Text>
  //             <TextInput
  //               style={styles.input}
  //               value={props.values.name}
  //               onChangeText={props.handleChange('name')}
  //             />
  //           </View>
  //           <View>
  //             <Text style={[gStyle.gText, { textAlign: 'center', marginTop: 20 }]}>
  //               Description
  //             </Text>
  //             <TextInput
  //               style={gStyle.input}
  //               value={props.values.description}
  //               onChangeText={props.handleChange('description')}
  //             />
  //           </View>
  //           <View style={styles.botton}>
  //             {/* <Button
  //               title="Save changes"
  //               type="submit"
  //               onPress={props.handleSubmit}
  //             /> */}
  //             <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
  //               <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Save Changes</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //     )}
  //   </Formik>
  // </SafeAreaView>

    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismiss keyboard');
    }}
    >

      <SafeAreaView style={[gStyle.main, styles.container]}>
        <Image
          source={pattern}
          style={{
            width: '100%', height: 340, position: 'absolute', top: 0, resizeMode: 'cover',
          }}
        />
        <Formik
          initialValues={{ name: user.name, description: user.description }}
          onSubmit={(values) => {
            dispatch(editProfileAction(user.id, values));
            navigation.navigate('ProfileScreen');
          }}
        >
          {(props) => (
            <View style={{
              width: '100%', height: '70%', position: 'absolute', bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 60, borderTopRightRadius: 60,
            }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 42, fontWeight: 'bold', alignSelf: 'center', paddingBottom: 34, color: '#8B4513', marginTop: 40,
                }}
                >
                  Edit Profile
                </Text>
                <TextInput
                  style={styles.input}
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                  placeholder="Enter name..."
                />
                <TextInput
                  style={styles.input}
                  value={props.values.description}
                  multiline
                  onChangeText={props.handleChange('description')}
                  placeholder="Enter description..."
                />
                <TouchableOpacity
                  style={styles.botton}
                  onPress={props.handleSubmit}
                >
                  <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Save Changes</Text>
                </TouchableOpacity>
                <Button
                  title="Save changes"
                  type="submit"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: '60%',
  },
  botton: {
    backgroundColor: '#A0522D',
    height: 58,
    borderRadius: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
