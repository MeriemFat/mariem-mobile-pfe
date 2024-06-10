import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Homebackground from "../HomeScreens/Homebackground"; // Assurez-vous que ce composant est utilisé si nécessaire.
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
  const [token, setToken] = useState(null);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  if (!fontsLoaded) {
    return null; // Ou un indicateur de chargement
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dans Assurence <Text style={styles.titlerouge}>Al-Takafoulia </Text></Text>
      <Text style={styles.detail}>
        Pour le meilleur et pour le pire
      </Text>
      <Image source={require("../../img/Home.png")} style={styles.img} />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (token) {
            props.navigation.navigate("Services");
          } else {
            props.navigation.navigate("Login");
          }
        }}>
        <Text style={styles.text}>Démarrer</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  img: {
    height: "37%",
    width: "85%",
    resizeMode: "contain",
  },
  title: {
    color: "#121212",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontSize: 30,
    marginTop: 1,
  },
  detail: {
    color: "#121212",
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 30,
    marginTop: 30,
  },
  btn: {
    marginTop: 12,
    backgroundColor: "#E2443B",
    paddingHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 35,
  },
  text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 30,
    color: "#FFF",
  },
  titlerouge: {
    color: "#E2443B",
  },
  autre: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
