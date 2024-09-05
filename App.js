import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./navigations/Navigation"; 
import  Homebackground  from "./screens/HomeScreens/Homebackground";
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}

