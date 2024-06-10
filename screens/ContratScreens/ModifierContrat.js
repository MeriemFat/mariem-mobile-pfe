import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from'../../constants/api-url'; 
const ModifierContrat = ({ navigation, route }) => {
  const contrat = route.params?.contrat || {};

  console.log('Route Params:', route.params);  // Pour déboguer et voir ce qui est passé dans les paramètres

  const [userData, setUserData] = useState({});
  const [etatDemande, setetatDemande] = useState('Envoyer');
  const [nom, setnom] = useState(contrat.nom || '');
  const [email, setemail] = useState(contrat.email || '');
  const [description, setdescription] = useState(contrat.description || '');
  const [typeDemande, setTypeDemande] = useState('Modification');
  const [codeClient, setcodeClient] = useState('');
  const [codeAgent, setcodeAgent] = useState('');
  const [DemandeData, setDemandeData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);

      if (user?.codeAgent) {
        setcodeAgent(user.codeAgent);
        setcodeClient(user.codeClient); 
        setUserData(user);
      } else {
        console.error('User codeAgent not found');
        Alert.alert('Erreur', 'Code agent utilisateur non trouvé');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAddDemande = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token && userData.codeClient) {
        const response = await axios.post(
          `${baseUrl}/demande/addDemande/${userData.codeClient}`,
          {
            etatDemande,
            nom,
            email,
            description,
            typeDemande,
            codeClient, 
            codeAgent
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log('Response:', response.data);  // Pour déboguer la réponse de l'API
        if (response.data.success) {
          Alert.alert('Succès', 'Votre demande de modification a été envoyée !');
          navigation.navigate('contratDetails');
        } else {
          console.error('Erreur:', response.data);
          Alert.alert('Succès', 'Votre demande de modification a été envoyée ');
        }
      } 
    } catch (error) {
      console.error('Error adding demande:', error.response ? error.response.data : error.message);
      Alert.alert('Succès', 'Votre demande de modification a été envoyée ');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: 'https://www.example.com/logo.png' }} // Remplacez par le lien de votre logo
        style={styles.logo}
      /> */}
      <Text style={styles.welcomeText}>Modifier Contrat</Text>
      <ScrollView style={{width:"100%" , padding :20}} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Votre Etat de demande de Modification</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={etatDemande}
            onChangeText={setetatDemande}
            placeholder="Votre Etat de demande de modification"
          />
          <Ionicons name="alert-circle-outline" size={20} color="#8e8e93" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Votre Nom</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setnom}
            placeholder="Votre Nom"
          />
          <Ionicons name="shield-outline" size={20} color="#8e8e93" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Votre Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setemail}
            placeholder="Votre Email"
          />
          <Ionicons name="mail-outline" size={20} color="#8e8e93" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Votre Description</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setdescription}
            placeholder="Votre Description"
          />
          <Ionicons name="document-text-outline" size={20} color="#8e8e93" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Type de Demande</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={typeDemande}
            onChangeText={setTypeDemande}
            placeholder="Type de demande"
          />
          <Ionicons name="document-text-outline" size={20} color="#8e8e93" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Code Client</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={codeClient}
            onChangeText={setcodeClient}
            placeholder="Code Client"
          />
          <Ionicons name="document-text-outline" size={20} color="#8e8e93" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Code Agent</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={codeAgent}
            onChangeText={setcodeAgent}
            placeholder="Code Agent"
          />
          <Ionicons name="document-text-outline" size={20} color="#8e8e93" style={styles.icon} />
        </View>
       
      </View>
      <View style={{padding:10}}>
          <TouchableOpacity style={styles.button} onPress={handleAddDemande}>
          <Text style={styles.buttonText}>Modifier Contrat</Text>
          </TouchableOpacity>
       </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop:20, 
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E2443B',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:190,
  },
  labelText: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#E2443B',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 20,
  },
});

export default ModifierContrat;