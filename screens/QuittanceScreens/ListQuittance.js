import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Colors } from '../../components/styles';
import { baseUrl } from '../../constants/api-url';
import { Header } from '../../components/Header';

const {primary, red } = Colors;

const ListQuittance = ({ navigation, route }) => {
  const [quittancesData, setQuittanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {quittanceId} = route.params;

  useEffect(() => {
    const fetchQuittanceById = async () => {
      try {
        console.log('Fetching Quittance with ID:', quittanceId);
        const response = await axios.get(`${baseUrl}/quittance/getQuittanceById/${quittanceId}`);
        if (response.data) {
          setQuittanceData(Array.isArray(response.data) ? response.data : [response.data]);
        } else {
          setError('No data found');
        }
      } catch (error) {
        console.error('Error fetching Quittance data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuittanceById();
  }, [quittanceId]);

  const renderQuittanceCards = () => {
    return quittancesData.map((quittance) => (
      <View key={quittance._id} style={styles.card}>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Numéro de Police:</Text>
          <Text style={styles.cardText}>{quittance.numPolice}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Numéro de Sinistre:</Text>
          <Text style={styles.cardText}>{quittance.numQuittance}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Code Agent:</Text>
          <Text style={styles.cardText}>{quittance.codeAgent}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Date Mut du :</Text>
          <Text style={styles.cardText}>{quittance.dateMutDu}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Date Mut Au:</Text>
          <Text style={styles.cardText}>{quittance.dateMutAu}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Prime Total:</Text>
          <Text style={styles.cardText}>{quittance.primeTotal}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextLabel}>Etat Mouvement Total:</Text>
          <Text style={styles.cardText}>{quittance.EtatMvt}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.cardsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={primary} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            renderQuittanceCards()
          )}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ModifierQuittance', { quittance: quittanceId })}>
            <Text style={styles.buttonText}>Modifier Quittance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop:25,
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

export default ListQuittance;
