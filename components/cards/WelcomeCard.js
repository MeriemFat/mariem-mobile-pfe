import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const WelcomeCard = (props ) => {
    const { userData } = props
  return (
    <View style={styles.welcomeContainer}>
    <Text style={styles.welcomeText}>Bienvenue</Text>
      <Text style={styles.clientName}>{userData.Nom}  <Text style={styles.clientName}>{userData.prenom}</Text></Text>
      <Text style={styles.accountNumber}>Votre numéro de compte : <Text style={styles.boldText}>{userData.codeClient}</Text></Text>
    </View>
  )
}


const styles = StyleSheet.create({

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

})