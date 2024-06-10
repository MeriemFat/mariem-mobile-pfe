import React , {useEffect,useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity , Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants/api-url';
import { WelcomeCard } from '../../components/cards/WelcomeCard';
import { Header } from '../../components/Header';
const Sinistre = ({ navigation }) => {
  // Données fictives des contrats
  const [sinistresData, setSinistresData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchSinistresData();
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

  const fetchSinistresData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);

      if (token && user?.codeClient) {
        const response = await axios.get(`${baseUrl}/sinistres/getSinistreByCodeClient/${user.codeClient}`, {
          headers: {               
            Authorization: `Bearer ${token}`,
          },
        });
        setSinistresData(response.data);
      } else {
        console.error('Token or user codeClient not found');
      }
    } catch (error) {
      console.error('Error fetching contract data:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderSinistreCards = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    return sinistresData.map((sinistre, index) => (
      <View key={index} style={styles.card}>
        <View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardText1}>Votre Num de police:</Text>
          <Text style={styles.cardText}>{sinistre.sinistre.numPolice}</Text>
        </View>
        <View style={styles.cardDetail}>
        <Text style={styles.cardText1}>Votre Num de Sinistre:</Text>
          <Text style={styles.cardText}>{sinistre.sinistre.numSinistre}</Text>
        </View>
        </View>
        <TouchableOpacity 
        onPress={() => navigation.navigate('ListSinistre', { sinistreId: sinistre.sinistre._id})}>
          <Ionicons style={styles.icon} name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header  title="Liste des Sinistre" onPressDrawer={()=> {
        navigation.openDrawer() 
        console.log("open")}} />
      <ScrollView>
      <WelcomeCard userData={userData}/>

        <View style={styles.cardsContainer}>
          {renderSinistreCards()}
        </View>
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
  welcomeContainer: {
    backgroundColor: 'white',
    height:120,
    width:270,  
    padding: 25,
    margin: 40,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  clientName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  header: {
    backgroundColor: '#E2443B',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
  },
  card: {
    width: '100%',
    paddingVertical:12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    marginLeft: 4,
    fontSize: 16,
  },
  cardTextType: {
    marginLeft: 40,
    fontSize: 16,
  },
  cardText1: {
    marginLeft: 2,
    fontSize: 16,
    color: 'blue'
  },
  cardUser: {
    alignContent: 'center',
    width: '75%',
    marginLeft: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  consultButton: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
   
  },
  icon:{
  }
});

export default Sinistre;
