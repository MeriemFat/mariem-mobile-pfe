import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"; // Importation de Image depuis React Native
import { Ionicons } from '@expo/vector-icons';

const EnregistrerModifier = (props) => {
  const handleReturnHome = () => {
    // Gérer la navigation pour retourner à la page d'accueil
    console.log("Retour à la page d'accueil");
  };

  return (
    <View style={styles.container}>
         <Image 
          source={require('../../img/logo.gif')} 
          style={styles.logo} 
          
        />
      <Text style={styles.text}>Votre Inscription est enregistrée avec succès. Un email sera envoyé lors de l'acceptation de votre inscription.</Text>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Home")}>
       
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={styles.buttonText}>Retour à la page d'accueil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:0.8,
    marginTop:35,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  logo: {
    width: 260,
    height: 150,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  text:{ 
    marginTop:20, 
  }
});

export default EnregistrerModifier;
