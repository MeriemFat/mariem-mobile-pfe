import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants/api-url';
import { WelcomeCard } from '../../components/cards/WelcomeCard';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { Colors } from '../../components/styles';


const Contract = () => {
  const navigation = useNavigation();
  const [contractsData, setContractsData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchContractsData();
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

  const fetchContractsData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      console.log("token in contract get====",token )

      if (token && user?.codeClient) {
        const response = await axios.get(`${baseUrl}/contrat/getContratByCodeClient/${user.codeClient}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContractsData(response.data);
      } else {
        console.error('Token or user codeClient not found');
      }
    } catch (error) {
      console.error('Error fetching contract data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContractCards = () => {
    if (loading) {
      return (
        <View style={{flex:1 , alignItems:"center", justifyContent:"center"}}>
        <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )
    }
    return contractsData.map((contract, index) => (
      <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate('ContraDetails', { contractId: contract.contrat._id})}>
        <View style={styles.cardIconContainer}>
          <Ionicons name="car-outline" size={24} color="blue" />
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>Votre Num de Police :<Text style={styles.cardSubtitle}> {contract.contrat.numPolice}</Text></Text>
          <Text style={styles.cardAddress}>Votre Produit : <Text style={styles.cardSubtitle}> {contract.contrat.libelle_branche}</Text></Text>
        </View>
        <Ionicons style={styles.chevronIcon} name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header  title="Contrats" onPressDrawer={()=> {
        navigation.openDrawer() 
        console.log("open")}} />
      <WelcomeCard userData={userData}/>
      <ScrollView>
        <View style={styles.cardsContainer}>
          {renderContractCards()}
        </View>
        <Text style={styles.missingContractText}>Je ne trouve pas mon contrat!</Text>
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
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
  },
  accountNumber: {
    fontSize: 16,
    color: '#fff',
  },
  boldText: {
    fontWeight: 'bold',
  },
  cardsContainer: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
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
    marginVertical: 2,
  },
  cardAddress: {
    fontSize: 12,
    color: '#999',
  },
  chevronIcon: {
    marginLeft: 10,
  },
  missingContractText: {
    textAlign: 'center',
    color: '#E2443B',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    color: '#333',
  },
  footerButtonTextActive: {
    fontSize: 12,
    color: '#E2443B',
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
    color: '#d92323',
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
  bold: {
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
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    marginLeft: 10,
  },
  cardTextType: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
  },
  icon: {
    width: 40,
    height: 40,
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
  notFoundText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  footerButtonText: {
    fontSize: 12,
    color: '#333',
  },
});

export default Contract;
