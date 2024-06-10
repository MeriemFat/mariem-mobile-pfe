import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const MenuButton = ({ title, source, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Image source={source} style={styles.icon} />
    </View>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

MenuButton.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconContainer: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});

export default MenuButton;
