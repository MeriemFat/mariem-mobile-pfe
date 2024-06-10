import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Colors } from '../../components/styles';
import { baseUrl } from '../../constants/api-url';
const { primary, red } = Colors;

const ContraDetails = ({ navigation,route }) => {
  const [contractsData, setContractsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const {contractId}= route.params;

  useEffect(() => {
    const fetchContractById = async () => {
      try {
        console.log('test',contractId)
        const response = await axios.get(`${baseUrl}/contrat/getContratById/${contractId}`); // Ensure this URL is correct
        if (response.data) {
          setContractsData(Array.isArray(response.data) ? response.data : [response.data]);
        } else {
          setError('No data found');
        }
      } catch (error) {
        console.error('Error fetching contract data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContractById();
  }, []);

  const renderContractCards = () => {
    return contractsData.map((contract) => (
      <View key={contract._id} style={styles.card}>
        <View style={styles.cardDetail}>
          <View>
            <Text style={styles.cardTextProduit}>Votre Produits : {contract.numPolice}</Text>
            <Text style={styles.cardTextClient}>Code Agent : {contract.codeAgent}</Text>
            <Text style={styles.cardTextDateEffait}>Code Client : {contract.codeClient}</Text>
            <Text style={styles.cardTextDescription}>Type Personne : {contract.type_personne}</Text>
            <Text style={styles.cardTextPrime}>Date Echeance Prochaine : {contract.date_echeance_prochaine}</Text>
            <Text style={styles.cardTexEchiance}>Sous Produits : {contract.libelle_sous_branche}</Text>
            <Text style={styles.cardTextDateDebut}>Produit : {contract.libelle_branche}</Text>
          </View>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardTextType}>{contract.type}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Consulter Votre Contrats</Text>
      </View> */}
      <ScrollView >
        <View style={styles.cardsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={primary} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            renderContractCards()
          )}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ModifierContrat' ,{contract: contractsData })}>
            <Text style={styles.buttonText}>Modifier Contrat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
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
    flexWrap: 'wrap',
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
  cardTextProduit: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 20,
  },
  cardTextClient: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 25,
  },
  cardTextDateEffait: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 25,
  },
  cardTextDescription: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 25,
  },
  cardTextPrime: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 25,
  },
  cardTexEchiance: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 25,
  },
  cardTextDateDebut: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 25,
  },
  cardTextFractionnement: {
    marginLeft: 4,
    fontSize: 16,
    marginTop: 25,
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

export default ContraDetails;
