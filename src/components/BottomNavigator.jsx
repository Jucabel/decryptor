import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRReader from './QRReader';
import QRList from './QRList';

const Tab = createMaterialBottomTabNavigator();
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const BottomNavigator = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

  return (
    <NavigationContainer>
      <Tab.Navigator barStyle={{ backgroundColor: '#2c1352' }}>
        <Tab.Screen
          name='READ'
          component={QRReader}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='qrcode-plus' color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name='LIST'
          component={QRList}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='format-list-checkbox' color={color} size={22} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
