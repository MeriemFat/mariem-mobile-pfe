import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Colors } from '../../components/styles';
import { baseUrl } from '../../constants/api-url';

const {primary, red } = Colors;

const ListSinistre = ({ navigation, route }) => {
  const [sinistresData, setSinistresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {sinistreId} = route.params;

  useEffect(() => {
    const fetchSinistreById = async () => {
      try {
        console.log('Fetching sinistre with ID:', sinistreId);
        const response = await axios.get(`${baseUrl}/sinistres/getSinistreById/${sinistreId}`);
        if (response.data) {
          setSinistresData(Array.isArray(response.data) ? response.data : [response.data]);
        } else {
          setError('No data found');
        }
      } catch (error) {
        console.error('Error fetching sinistre data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSinistreById();
  }, [sinistreId]);

  const renderSinistreCards = () => {
    return sinistresData.map((sinistre) => (
      <View key={sinistre._id} style={styles.card}>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Numéro de Police:</Text>
          <Text style={styles.cardText}>{sinistre.numPolice}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Numéro de Sinistre:</Text>
          <Text style={styles.cardText}>{sinistre.numSinistre}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Code Client:</Text>
          <Text style={styles.cardText}>{sinistre.codeClient}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Code Agent:</Text>
          <Text style={styles.cardText}>{sinistre.codeAgent}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Restant à Régler:</Text>
          <Text style={styles.cardText}>{sinistre.restRegler}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>État du Sinistre:</Text>
          <Text style={styles.cardText}>{sinistre.etatSinistre}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Libellé Mouvement Sinistre:</Text>
          <Text style={styles.cardText}>{sinistre.libellerMouvementSinistre}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Détails du Sinistre</Text>
      </View> */}
      <ScrollView>
        <View style={styles.cardsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={primary} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            renderSinistreCards()
          )}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ModifierSinistre', { sinistre: sinistresData })}>
            <Text style={styles.buttonText}>Modifier Sinistre</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTextLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E2443B',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: red,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ListSinistre;
