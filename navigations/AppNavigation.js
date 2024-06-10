import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import SideBar from "../screens/SideBar/SideBar";
import {
  AddAvenant,
  Contrat,
  ContratDetails,
  Quittance,
  Sinistre,
} from "../screens";
import BottomTabNavigation from "./BottomTabNavigation";

import Categories from "../screens/Categories/Categories";
import ListQuittance from "../screens/QuittanceScreens/ListQuittance";
import ModifierContrat from "../screens/ContratScreens/ModifierContrat";
import ListSinistre from "../screens/SinistreScreen/ListSinistre";
import ModifierSinistre from "../screens/SinistreScreen/ModifierSinistre";
import ModifierQuittance from "../screens/QuittanceScreens/ModifierQuittance";
import Produit from "../screens/Categories/Produit";
import MenuButton from "../screens/DrawerContainer/MenuButton";
import ContraDetails from "../screens/ContratScreens/ContratDetails";
const Stack = createStackNavigator();

function  MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Service" component={BottomTabNavigation} />
    
      <Stack.Screen 
      name="Categories" 
      options={{
        headerShown: true,
        title: "Catégorie", // Set the custom header title
        headerBackTitle: "Retour",
        headerTintColor: "#E2443B",
      }}
      component={Categories} />
      <Stack.Screen name="ContratDetails" component={ContraDetails} />
      <Stack.Screen name="ListSinistre" component={ListSinistre} />
      <Stack.Screen
        name="ModifierContrat"
        options={{
          headerShown: true,
          title: "", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        component={ModifierContrat}
      />
      <Stack.Screen name="ListQuittance" component={ListQuittance} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        name="ModifierSinistre"
        component={ModifierSinistre}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        name="ModifierQuittance"
        component={ModifierQuittance}
      />
      <Stack.Screen name="Produit" component={Produit} />
      <Stack.Screen name="MenuButton" component={MenuButton} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="home"
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="drawer" component={BottomTabNavigation} />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return <DrawerStack />;
}

console.disableYellowBox = true;
