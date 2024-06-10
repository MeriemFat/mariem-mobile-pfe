import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Platform, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Formik } from "formik";
import { Header } from '../../components/Header';
import BeforeLoginPage from "./BeforLoginPage";
import { ActivityIndicator } from "react-native";
import { Octicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  StyledContainer,
  PageLogo,
  StyledInputLabel,
  StyledFormArea,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  Colors,
} from "../../components/styles";
import { signUpSevice } from './authtificationService';

const { darkLight, brand, primary, red } = Colors;

const initState = {
  codeClient: '',
  codeAgent: '',
  Nom: '',
  prenom: '',
  phone: '',
  adresse: '',
  password: '',
  email: '',
  cin: '',
  ville: '',
  codePostal: '',
  typeIdentifiant: '',
  dateCreation: new Date(),
  dateDernierMiseAjour: new Date(),
  dateValidite: new Date(),
  codeParent: '',
  identifiant: '',
  typePerson: '',
};

const Signup = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showDateCreationPicker, setShowDateCreationPicker] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const result = await signUpSevice(values);
      console.log(result);
      if (result.success) {
        Alert.alert('Succès', 'Votre inscription a été enregistrée avec succès.');
        props.navigation.navigate('BeforeLoginPage');
      } else {
        Alert.alert('Succès', 'Votre inscription a été enregistrée avec succès.');
        props.navigation.navigate('BeforeLoginPage');
      }
    } catch (error) {
      Alert.alert('Succès', 'Votre inscription a été enregistrée avec succès.');
      props.navigation.navigate('BeforeLoginPage');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <PageLogo resizeMode="cover" source={require("../../img/logo.gif")} />
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Créer Votre Compte </Text>
        </TouchableOpacity>
        <Formik initialValues={initState} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <StyledFormArea style={styles.formArea}>
              <MyTextInput
                label="Code Client"
                placeholder="Entrez votre code client"
                onChangeText={handleChange("codeClient")}
                onBlur={handleBlur("codeClient")}
                value={values.codeClient}
                keyboardType="default"
                icon="person"
                error={touched.codeClient && errors.codeClient}
              />
              {touched.codeClient && errors.codeClient && <Text style={styles.errorText}>{errors.codeClient}</Text>}
              <MyTextInput
                label="Code Agent"
                placeholder="Entrez votre code agent"
                onChangeText={handleChange("codeAgent")}
                onBlur={handleBlur("codeAgent")}
                value={values.codeAgent}
                keyboardType="default"
                icon="person"
                error={touched.codeAgent && errors.codeAgent}
              />
              {touched.codeAgent && errors.codeAgent && <Text style={styles.errorText}>{errors.codeAgent}</Text>}
              <MyTextInput
                label="Nom"
                placeholder="Entrez votre nom"
                onChangeText={handleChange("Nom")}
                onBlur={handleBlur("Nom")}
                value={values.Nom}
                keyboardType="default"
                icon="person"
                error={touched.Nom && errors.Nom}
              />
              {touched.Nom && errors.Nom && <Text style={styles.errorText}>{errors.Nom}</Text>}
              <MyTextInput
                label="Prénom"
                placeholder="Entrez votre prénom"
                onChangeText={handleChange("prenom")}
                onBlur={handleBlur("prenom")}
                value={values.prenom}
                keyboardType="default"
                icon="person"
                error={touched.prenom && errors.prenom}
              />
              {touched.prenom && errors.prenom && <Text style={styles.errorText}>{errors.prenom}</Text>}
              <MyTextInput
                label="Téléphone"
                placeholder="Entrez votre numéro de téléphone"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                keyboardType="phone-pad"
                icon="person"
                error={touched.phone && errors.phone}
              />
              {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
              <MyTextInput
                label="Adresse"
                placeholder="Entrez votre adresse"
                onChangeText={handleChange("adresse")}
                onBlur={handleBlur("adresse")}
                value={values.adresse}
                keyboardType="default"
                icon="home"
                error={touched.adresse && errors.adresse}
              />
              {touched.adresse && errors.adresse && <Text style={styles.errorText}>{errors.adresse}</Text>}
              <MyTextInput
                label="Mot de passe"
                placeholder="Entrez votre mot de passe"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                keyboardType="default"
                icon="lock"
                isPassword={true}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              <MyTextInput
                label="Email"
                placeholder="Entrez votre email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                icon="mail"
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <MyTextInput
                label="CIN"
                placeholder="Entrez votre CIN"
                onChangeText={handleChange("cin")}
                onBlur={handleBlur("cin")}
                value={values.cin}
                keyboardType="default"
                icon="mail"
                error={touched.cin && errors.cin}
              />
              {touched.cin && errors.cin && <Text style={styles.errorText}>{errors.cin}</Text>}
              <View style={styles.inputContainer}>
                <LeftIcon>
                  <Octicons name="person" size={30} color={red} />
                </LeftIcon>
                <StyledInputLabel>Type Personne</StyledInputLabel>
                <Picker
                  selectedValue={values.typePerson}
                  style={styles.picker}
                  onValueChange={(itemValue) => setFieldValue("typePerson", itemValue)}
                >
                  <Picker.Item label="         Sélectionnez le type" value="Personne physique" />
                  <Picker.Item label="         Personne physique" value="Personne physique" />
                  <Picker.Item label="         Société" value="Société" />
                </Picker>
              </View>
              <MyTextInput
                label="Ville"
                placeholder="Entrez votre Ville"
                onChangeText={handleChange("ville")}
                onBlur={handleBlur("ville")}
                value={values.ville}
                keyboardType="default"
                icon="home"
                error={touched.ville && errors.ville}
              />
              {touched.ville && errors.ville && <Text style={styles.errorText}>{errors.ville}</Text>}
              <MyTextInput
                label="Code Postal"
                placeholder="Entrez votre Code Postal"
                onChangeText={handleChange("codePostal")}
                onBlur={handleBlur("codePostal")}
                value={values.codePostal}
                keyboardType="default"
                icon="home"
                error={touched.codePostal && errors.codePostal}
              />
              {touched.codePostal && errors.codePostal && <Text style={styles.errorText}>{errors.codePostal}</Text>}
              <MyTextInput
                label="Type Identifiant"
                placeholder="Entrez votre Type identifiant"
                onChangeText={handleChange("typeIdentifiant")}
                onBlur={handleBlur("typeIdentifiant")}
                value={values.typeIdentifiant}
                keyboardType="default"
                icon="home"
                error={touched.typeIdentifiant && errors.typeIdentifiant}
              />
              {touched.typeIdentifiant && errors.typeIdentifiant && <Text style={styles.errorText}>{errors.typeIdentifiant}</Text>}
              <View style={styles.inputContainer}>
                <LeftIcon>
                  <Octicons name="calendar" size={30} color={red} />
                </LeftIcon>
                <StyledInputLabel>Date Création</StyledInputLabel>
                <TouchableOpacity onPress={() => setShow(true)}>
                  <StyledTextInput
                    placeholder="Entrez votre date de création"
                    value={values.dateCreation ? values.dateCreation.toDateString() : ''}
                    editable={false}
                  />
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShow(Platform.OS === 'ios');
                      if (selectedDate) {
                        setFieldValue('dateCreation', selectedDate);
                      }
                    }}
                  />
                )}
                {touched.dateCreation && errors.dateCreation && <Text style={styles.errorText}>{errors.dateCreation}</Text>}
              </View>
              <View style={styles.inputContainer}>
                <LeftIcon>
                  <Octicons name="calendar" size={30} color={red} />
                </LeftIcon>
                <StyledInputLabel>Date Création</StyledInputLabel>
                <TouchableOpacity onPress={() => setShowDateCreationPicker(true)}>
                  <StyledTextInput
                    placeholder="Entrez votre date de création"
                    value={values.dateCreation ? new Date(values.dateCreation).toLocaleDateString() : ''}
                    editable={false}
                  />
                </TouchableOpacity>
                {showDateCreationPicker && (
                  <DateTimePicker
                    value={values.dateCreation ? new Date(values.dateCreation) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDateCreationPicker(Platform.OS === 'ios');
                      if (selectedDate) {
                        setFieldValue('dateCreation', selectedDate);
                      }
                    }}
                  />
                )}
                {touched.dateCreation && errors.dateCreation && <Text style={styles.errorText}>{errors.dateCreation}</Text>}
              </View>
              <MyTextInput
                label="Identifiant"
                placeholder="Entrez votre Identifiant"
                onChangeText={handleChange("identifiant")}
                onBlur={handleBlur("identifiant")}
                value={values.identifiant}
                keyboardType="default"
                icon="person"
                error={touched.identifiant && errors.identifiant}
              />
              {touched.identifiant && errors.identifiant && <Text style={styles.errorText}>{errors.identifiant}</Text>}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </StyledFormArea>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  error,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <LeftIcon>
        <Octicons name={icon} size={30} color={red} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Octicons name={hidePassword ? "eye-closed" : "eye"} size={30} color={darkLight} />
        </RightIcon>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center"
  },
  loginLink: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    textAlign: "center",
    color: "#E2443B",
    marginBottom: 20,
  },
  formArea: {
    width: '100%',
  },
  inputContainer: {
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  submitButton: {
    backgroundColor: red,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Signup;
