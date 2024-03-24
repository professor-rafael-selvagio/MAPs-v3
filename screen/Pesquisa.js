import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import getLocationCoordinates from '../components/LocationComponent';

const Pesquisa = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
        try {
          // Chame a função getLocationCoordinates
          const coordinates = await getLocationCoordinates();
          if (coordinates) {
            // Atualize o estado region com as coordenadas obtidas
            setRegion(coordinates);
          } else {
            Alert.alert('Erro', 'Não foi possível obter as coordenadas do dispositivo.');
          }
        } catch (error) {
          Alert.alert('Erro', 'Ocorreu um erro ao obter as coordenadas do dispositivo.');
        }
    };
  
    fetchLocation();
  }, []);

  const handleSearch = async () => {
    Alert.alert('Pesquisa', `Você pesquisou por: ${searchText}`);

    try {
      const apiKey = 'API_KEY';
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchText)}&key=${apiKey}`;
      
      const response = await axios.get(apiUrl);
      const responseData = response.data;
      
      // Verificar se a requisição foi bem-sucedida
      if ('OK') {
        // Extrair a latitude e longitude do primeiro resultado
        
        // Definir a região do MapView com as coordenadas obtidas
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.1, // Delta de latitude para o zoom
          longitudeDelta: 0.1, // Delta de longitude para o zoom
        });

        // Adicionar um marcador à lista de marcadores
        
      } else {
        // Exibir mensagem de erro
        console.error('Erro ao realizar a geocodificação:', responseData.error_message);
      }
    } catch (error) {
      // Tratar erros de requisição
      console.error('Erro ao realizar a requisição:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >

      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Pesquisar" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default Pesquisa;
