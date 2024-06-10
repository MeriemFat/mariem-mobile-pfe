import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./navigations/Navigation"; 
import  Homebackground  from "./screens/HomeScreens/Homebackground";
export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}

