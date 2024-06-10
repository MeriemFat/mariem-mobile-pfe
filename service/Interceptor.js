import axios from 'axios';
import Toast from 'react-native-simple-toast';

import {baseUrl} from '../constants/api-url';

import AsyncStorage from '@react-native-async-storage/async-storage';




let isSignedOut = true;

const cancelToken = axios.CancelToken;
const source = cancelToken.source();
const Interceptor = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },

  cancelToken: source.token,
});
Interceptor.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    // console.log('token : ' + token);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  error => {
    setTimeout(() => {
      Toast.show(error?.message);
    }, 500);
    return Promise.reject(error);
  },
);

Interceptor.interceptors.response.use(
  response => {
    if (response.data.success === false) {
      setTimeout(() => {
        Toast.show(response?.data?.message);
      }, 500);
      throw new Error(response?.data?.message);
    }
    isSignedOut = true;
    return response;
  },
  async error => {
    console.log('error',error);
    }
    
);


export default Interceptor;