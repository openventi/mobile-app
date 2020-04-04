import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PairScreen from './Screens/PairScreen';
import DeviceScreen from './Screens/DeviceScreen';
import { SCREENS } from './constants';

const Drawer = createDrawerNavigator();

export default App = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={SCREENS.sync}>
          <Drawer.Screen name={SCREENS.sync}>{({ navigation }) => <PairScreen navigation={navigation} ventilator="N99" />}</Drawer.Screen>
          <Drawer.Screen name={SCREENS.monitor} component={DeviceScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
