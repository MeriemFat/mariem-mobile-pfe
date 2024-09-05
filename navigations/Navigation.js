import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/HomeScreens/Home";
import Login from "../screens/AuthentificationScreens/Login";
import Services from "../screens/Services";
import BeforeLoginPage from "../screens/AuthentificationScreens/BeforLoginPage";
import {
  AddAvenant,
  Contrat,
  Quittance,
  Sinistre,
  Categories,
  Reclamation,
} from "../screens";
import ContraDetails from "../screens/ContratScreens/ContratDetails";
import ListQuittance from "../screens/QuittanceScreens/ListQuittance";
import ModifierContrat from "../screens/ContratScreens/ModifierContrat";
import Chapters from "../screens/QuittanceScreens/Chapters";
import ListSinistre from "../screens/SinistreScreen/ListSinistre";
import ModifierSinistre from "../screens/SinistreScreen/ModifierSinistre";
import ModifierQuittance from "../screens/QuittanceScreens/ModifierQuittance";
import MenuButton from "../screens/DrawerContainer/MenuButton";
import Produit from "../screens/Categories/Produit";
import Signup from "../screens/AuthentificationScreens/Signup"; 
import SideBar from "../screens/SideBar/SideBar";
import BottomTabNavigation from "./BottomTabNavigation";
import Parinage from "../screens/ParinageScreens/Parinage";
import { enableScreens } from 'react-native-screens';

enableScreens();

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Service" component={BottomTabNavigation} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="SideBar" component={SideBar} />
      <Stack.Screen name="BeforeLoginPage" component={BeforeLoginPage} />
      <Stack.Screen
        name="ListSinistre"
        options={{
          headerShown: true,
          title: "Detail du sinistre", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        component={ListSinistre}
      />
       <Stack.Screen
        name="Parinage"
        options={{
          headerShown: true,
          title: "Code de Parinage ", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        component={Parinage}
      />
        <Stack.Screen
        name="Signup"
        options={{
          headerShown: true,
          title: "Retour page d'acceuille", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        component={Signup}
      />
      <Stack.Screen
        name="ContraDetails"
        options={{
          headerShown: true,
          title: "Details du contrat", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        component={ContraDetails}
      />
      <Stack.Screen
        name="ListQuittance"
        options={{
          headerShown: true,
          title: "Détails de quittance", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        component={ListQuittance}
      />
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
      <Stack.Screen
        name="ModifierSinistre"
        options={{
          headerShown: true,
          title: "", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        component={ModifierSinistre}
      />
      <Stack.Screen
        name="ModifierQuittance"
        options={{
          headerShown: true,
          title: "", // Set the custom header title
          headerBackTitle: "Retour",
          headerTintColor: "#E2443B",
        }}
        component={ModifierQuittance}
      />
      <Stack.Screen 
      name="Produit"
      options={{
       headerShown: true,
       title: "Produits", // Set the custom header title
       headerBackTitle: "Retour",
       headerTintColor: "#E2443B",
     }}
      component={Produit} />
      <Stack.Screen name="Chapters" component={Chapters} />
      <Stack.Screen 
      name="Categories" 
       options={{
        headerShown: true,
        title: "Catégorie", // Set the custom header title
        headerBackTitle: "Retour",
        headerTintColor: "#E2443B",
      }}
      component={Categories} />
      <Stack.Screen name="MenuButton" component={MenuButton} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
