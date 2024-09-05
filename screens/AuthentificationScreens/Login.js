import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import { Octicons } from '@expo/vector-icons';
import { baseUrl } from '../../constants/api-url';
import { 
     StyledContainer, 
     PageLogo,
     StyledInputLabel,
     StyledFormArea,
     StyledTextInput,
     LeftIcon,
     InnerContainer,
     RightIcon,
     Colors

 }  from '../../components/styles';
 import AsyncStorage from '@react-native-async-storage/async-storage';
import SideBar from'../SideBar/SideBar'; 
const { darkLight, red } = Colors;

const Login = (props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  // pour voir l'etat de la valeur token dans local storage 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log("token", token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchData();
  }, []);

  

  const handleSubmit = async ({ email, password }) => {

    console.log(email , password)
    try {
      const response = await axios.post(`${baseUrl}/User/login`, { email, password });
      console.log(response.data);

      AsyncStorage.setItem('token', response.data.accessToken);
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      props.navigation.navigate("Services");
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Une erreur s'est produite lors de la communication avec le serveur.");
      } else {
        setErrorMessage("Une erreur inattendue s'est produite.");
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={{alignItems:"center" ,marginTop:30 }}>

        <View style={{marginBottom:30 }}>
        <PageLogo resizeMode="cover" source={require('../../img/logo.gif')} />
        </View>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{width:"100%"}}
        contentContainerStyle={{alignItems:"center"}}
        >
        <Text style={styles.title}>BONJOUR!</Text>
        <Text style={[styles.title2,{margin:20}]}>Bienvenue dans votre espace assurance!</Text>
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                placeholder="andyj@gmail.com"
                placeholderTextColor={darkLight}
                onBlur={handleBlur('email')}
                value={values.email}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                icon="mail"
              />
              <MyTextInput
                label="Password"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                onBlur={handleBlur('password')}
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry={hidePassword}
                icon="lock"
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <View style={{marginTop:10}}>
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.aff2}>Connexion</Text>
              </TouchableOpacity>
              <View style={styles.messageLogin}>
              <Text>Vous n'avez pas de compte?</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
                <Text style={styles.title3}>S'inscrire</Text>
              </TouchableOpacity>
              </View>
              </View>
              
            </StyledFormArea>
          )}
        </Formik>
        </ScrollView>
       
    </KeyboardAvoidingView>
  );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View key={label}>
      <LeftIcon>
        <Octicons name={icon} size={30} color={red} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Octicons name={hidePassword ? "eye-closed" : "eye"} size={30} color={red} />
        </RightIcon>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 22,
    textAlign: "center",
    color: "#E2443B",
    marginTop: 32,
  },
  title2: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    color: "#121212",
    marginTop: 15,
  },
  messageLogin:{
    marginTop:10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  btn: {
    marginTop: 12,
    backgroundColor: "#E2443B",
    paddingHorizontal: 90,
    paddingVertical: 15,
    borderRadius: 10,
  },
  aff2: {
    textAlign: 'center',
    color: "#FFFF",
    fontSize: 20,
  },
  title3: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    textAlign: "center",
    color: "#E2443B",
    marginTop: -20,
    marginLeft: 128,
    marginBottom: 20,
  },
});

export default Login;