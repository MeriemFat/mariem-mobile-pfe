import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Parinage = () => {
  const [qrValue, setQrValue] = useState("");
  const fetchCodes = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      let value = JSON.parse(userString);
      setQrValue(`Client:${value.codeClient},Agent:${value.codeAgent}`);

     
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };
  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <View style={styles.container}>
      <QRCode value={`https://takafoulia-projetpfe-4.onrender.com/share?${qrValue}`} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Parinage;
