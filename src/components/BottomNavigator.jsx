import React, { useState, useEffectf } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setTab } from '../redux/reducers/qrReducer';
import { connect } from 'react-redux';
import QRReader from './QRReader';
import QRList from './QRList';

const Tab = createMaterialBottomTabNavigator();
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const BottomNavigator = ({ setTab, nTab }) => {
  return (
    <NavigationContainer
      onStateChange={(e) => {
        setTab(e.index);
      }}>
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

const mapStateToProps = (state) => ({
  nTab: state.qrReducer.nTab,
});

export default connect(mapStateToProps, { setTab })(BottomNavigator);
