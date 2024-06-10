import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
//import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { baseUrl } from '../../constants/api-url';

const Parinage = () => {
  return (
    <View style={styles.container}>
      <QRCode value='https://www.github.com/chelseafarley' />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Parinage;
