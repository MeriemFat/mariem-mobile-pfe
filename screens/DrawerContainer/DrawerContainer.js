import React,{useState , useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import PropTypes from "prop-types";
import MenuButton from "./MenuButton";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../../constants/api-url'; 
export default function DrawerContainer(props) {

  const [userData, setUserData] = useState({});
 

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      if (token && user?.codeClient) {
        const response = await axios.get(`${baseUrl}/user/getUserByCodeClient/${user.codeClient}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } else {
        console.error('Token or user codeClient not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const { navigation } = props;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Efface le token du stockage
    props.navigation.navigate("Login");
    props.navigation.closeDrawer(); // Ferme le tiroir de navigation
  };

  return (
    <ScrollView style={styles.content}>
      <View style={styles.header}>
        <View style={styles.userInfoSection}>
          <Image source={require("../../assets/images/logo.png")} style={styles.userImage} />
          <Text style={styles.userName}>{userData.Nom}  <Text style={styles.userName}>{userData.prenom}</Text></Text>
        </View>
      </View>
      <View style={styles.container}>
        <MenuButton
          title="Home"
          source={require("../../assets/icons/home-outline.png")}
          onPress={() => {
            navigation.navigate("Services");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Contrat"
          source={require("../../assets/icons/contrat.png")}
          onPress={() => {
            navigation.navigate("Contrat" );
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Sinistre"
          source={require("../../assets/icons/sinsitre.png")}
          onPress={() => {
            navigation.navigate("Sinistre");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Quittance"
          source={require("../../assets/icons/quittance.png")}
          onPress={() => {
            navigation?.navigate("Quittance");
            navigation?.closeDrawer();
          }}
        />
        <MenuButton
          title="Demande"
          source={require("../../assets/icons/request.png")}
          onPress={() => {
            navigation.navigate("AddAvenant");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Déconnexion"
          source={require("../../assets/icons/logout.png")}
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#ff5232',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom:-20,
    marginBottom: -20,
  },
  userInfoSection: {
    padding: 30,
    alignItems: 'center',
  },
  userImage: {
    width: 80,
    height: 80,
    marginTop:40,
  
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  userCoins: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
