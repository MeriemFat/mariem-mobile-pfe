import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../../constants/api-url'; 
import { WelcomeCard } from '../../components/cards/WelcomeCard';
import { Header } from '../../components/Header';


const AddAvenant = ({ navigation }) => {
  const [demandes, setDemandes] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchDemandesData();
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

  const fetchDemandesData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);

      if (token && user?.codeClient) {
        const response = await axios.get(`${baseUrl}/demande/getAllDemandesByCodeClient/${user.codeClient}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDemandes(response.data);
      } else {
        console.error('Token or user codeClient not found');
      }
    } catch (error) {
      console.error('Error fetching demandes data:', error);
      Alert.alert('Erreur', 'Erreur lors de la récupération des demandes');
    } finally {
      setLoading(false);
    }
  };

  const renderDemandesCards = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (demandes.length === 0) {
      return <Text style={styles.noDemandes}>Aucune demande pour le moment.</Text>;
    }
    return demandes.map((demande, index) => (
      <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate('DemandeDetails', { demandeId: demande._id })}>
        <View style={styles.cardIconContainer}>
          <Ionicons name="document-text-outline" size={24} color="blue" />
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{demande.nom}</Text>
          <Text style={styles.cardSubtitle}>Type: {demande.TypeDemande}</Text>
          <Text style={styles.cardDate}>Reçu le : {new Date(demande.date).toLocaleDateString()}</Text>
          <Text style={[styles.cardStatus, { backgroundColor: getStatusColor(demande.etatDemande) }]}>{demande.etatDemande}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Envoyer':
        return 'orange';
      case 'En Cours De Traitement':
        return 'blue';
      case 'Traiter':
        return 'green';
      default:
        return 'grey';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Header  title="Demandes" onPressDrawer={()=> {
        navigation.openDrawer() 
        console.log("open")}} />
      <WelcomeCard userData={userData}/>
      <ScrollView>
        <View style={styles.cardsContainer}>
          {renderDemandesCards()}
        </View>
        <Text style={styles.missingContractText}>Je ne trouve pas ma demande!</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:25,
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#E2443B',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileIcon: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  profileIconText: {
    fontSize: 16,
    color: '#E2443B',
  },
  logo: {
    width: 40,
    height: 40,
  },
  welcomeContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
  },
  clientName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  accountNumber: {
    fontSize: 16,
    color: '#666',
  },
  boldText: {
    fontWeight: 'bold',
  },
  cardsContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardIconContainer: {
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
  },
  cardStatus: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  noDemandes: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  missingContractText: {
    textAlign: 'center',
    color: '#E2443B',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
});

export default AddAvenant;
