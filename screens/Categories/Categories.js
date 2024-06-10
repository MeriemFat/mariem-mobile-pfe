import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, Text, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { baseUrl } from '../../constants/api-url';

const CARD_WIDTH = Dimensions.get('window').width * 0.9;

const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/categorie/getAllCatalogues`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Produit', { codeBranche: item.codeBranche })}
          >
            <Card style={styles.card}>
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/images/a1.png')} style={styles.image} />
              )}
              <Card.Content>
                <Title style={styles.title}>Libeller:<Title style={styles.cardText}> {item.libellerBranche}</Title></Title>
                <Title style={styles.title}>Description:<Title style={styles.cardText}> {item.description}</Title></Title>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => navigation.navigate('Produit', { codeBranche: item.codeBranche })}>
                  Consulter les Produits
                </Button>
              </Card.Actions>
            </Card>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#6200ee',
  },
  card: {
    width: CARD_WIDTH,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
  paragraph: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  listContent: {
    paddingVertical: 10,
  },
});

export default Categories;
