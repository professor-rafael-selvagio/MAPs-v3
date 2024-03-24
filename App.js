import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MinhaLocalizacao from './screen/MinhaLocalizacao';
import SenaiSaoCarlos from './screen/SenaiSaoCarlos';
import SenaiSaoCaetanoDoSul from './screen/SenaiSaoCaetanoDoSul';
import InserirLocalizacao from './screen/InserirLocalizacao';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Página Inicial" }}
        />
        <Stack.Screen
          name="MinhaLocalizacao"
          component={MinhaLocalizacao}
          options={{ title: "Minha Localização" }}
        />
        <Stack.Screen
          name="SenaiSaoCarlos"
          component={SenaiSaoCarlos}
          options={{ title: "Senai São Carlos" }}
        />
        <Stack.Screen
          name="SenaiSaoCaetanoDoSul"
          component={SenaiSaoCaetanoDoSul}
          options={{ title: "Senai São Caetano do Sul" }}
        />
        <Stack.Screen
          name="InserirLocalizacao"
          component={InserirLocalizacao}
          options={{ title: "Inserir Localização" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonNavegar}
        onPress={() => navigation.navigate("MinhaLocalizacao")}
      >
        <Image
          source={require('./src/img/MinhaLocalizacao.jpg')}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Minha Localização</Text>
      </TouchableOpacity>

      <View style={styles.space}></View>

      <TouchableOpacity
        style={styles.buttonNavegar}
        onPress={() => navigation.navigate("SenaiSaoCarlos")}
      >
        <Image
          source={require('./src/img/SenaiSaoCarlos.jpeg')}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Senai São Carlos</Text>
      </TouchableOpacity>

      <View style={styles.space}></View>

      <TouchableOpacity
        style={styles.buttonNavegar}
        onPress={() => navigation.navigate("SenaiSaoCaetanoDoSul")}
      >
        <Image
          source={require('./src/img/SenaiSaoCaetanoDoSul.jpg')}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Senai São Caetano do Sul</Text>
      </TouchableOpacity>

      <View style={styles.space}></View>

      <TouchableOpacity
        style={styles.buttonNavegar}
        onPress={() => navigation.navigate("InserirLocalizacao")}
      >
        <Image
          source={require('./src/img/InserirLocalizacao.jpeg')}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Inserir Localização</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: Dimensions.get('window').width * 0.95, 
    height: 100,
    marginBottom: 20,
  },
  buttonNavegar: {
    backgroundColor: "#B71C1C",
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  space: {
    height: 20,
  },
});

export default App;
