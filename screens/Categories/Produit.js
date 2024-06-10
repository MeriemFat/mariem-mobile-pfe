import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Title, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { baseUrl } from '../../constants/api-url';
import AsyncStorage from '@react-native-async-storage/async-storage';
const numColumns = 2;
const CARD_WIDTH = (Dimensions.get('window').width / numColumns) - 16 * 2;

const Produit = ({ route}) => {
  const { codeBranche } = route.params;
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(`${baseUrl}/produit/getProduitByCodeBranche/${codeBranche}`);
        setProduits(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching produits:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProduits();
  }, [codeBranche]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load products. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={produits}
        keyExtractor={(item) => (item._id ? item._id.toString() : item.codeBranche ? item.codeBranche.toString() : Math.random().toString())}
        renderItem={({ item }) => (
            <Card style={[styles.card, { width: CARD_WIDTH }]}>
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/icons/sinsitre.png')} style={styles.image} />
              )}
              <Card.Content>
                <Title style={styles.cardSubtitle}>Libeller branches: {item.produit.libelle_sous_branche}</Title>
              </Card.Content>
            </Card>
        )}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6200ee',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#555',
    marginVertical: 1,
    textAlign: 'center',
  },
});

export default Produit;
