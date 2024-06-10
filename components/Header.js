import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

export const Header = ({ title , onPressDrawer }) => {
  
	return (
	  <View style={styles.header}>
		<TouchableOpacity
		  onPress={onPressDrawer}
		  style={styles.profileIcon}
		>
			<Feather name="menu" size={24} color="black" />
		</TouchableOpacity>
		<Text style={styles.headerText}>{title}</Text>
		<Image source={require('../assets/images/logo.png')} style={styles.logo} />
	  </View>
	);
  };

  const styles = StyleSheet.create({
	
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
	profileIcon: {
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 10,
	  },
	  profileIconText: {
		fontSize: 16,
		color: '#d92323',
	  },
	  headerText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	  },
	  logo: {
		width: 40,
		height: 40,
	  },


})

