import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const InserirLocalizacao = () => {
  // Estados para armazenar as coordenadas, região do mapa e tipo de mapa
  const [latitude, setLatitude] = useState('40.758896');
  const [longitude, setLongitude] = useState('-73.985130');
  const [mapRegion, setMapRegion] = useState(null);
  const [mapType, setMapType] = useState('standard');

  // Referência para o componente MapView
  const mapRef = useRef(null);

  // Função para buscar a localização digitada
  const handleBuscarLocalizacao = () => {
    if (latitude !== '' && longitude !== '') {
      const lat = parseFloat(latitude);
      const long = parseFloat(longitude);

      // Anima para a nova região no mapa
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  };

  // Função para ampliar o zoom no mapa
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta / 2,
        longitudeDelta: mapRegion.longitudeDelta / 2,
      });
    }
  };

  // Função para reduzir o zoom no mapa
  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta * 2,
        longitudeDelta: mapRegion.longitudeDelta * 2,
      });
    }
  };

  // Função para alternar entre os tipos de mapa 'standard' e 'satellite'
  const handleToggleMapType = () => {
    setMapType((prevMapType) => (prevMapType === 'standard' ? 'satellite' : 'standard'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Digite a Latitude:</Text>
        <TextInput
          style={styles.input}
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
          keyboardType="numbers-and-punctuation"
        />
      </View>

      <View style={styles.row}>
        <Text>Digite a Longitude:</Text>
        <TextInput
          style={styles.input}
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
          keyboardType="numbers-and-punctuation"
        />
      </View>

      <View style={styles.row}>
        <Button title="Buscar Localização" onPress={handleBuscarLocalizacao} />
      </View>

      {/* MapView para exibir o mapa */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={mapRegion}
        onRegionChangeComplete={(region) => setMapRegion(region)}
        mapType={mapType} // Configurar o tipo de mapa
      >
        {mapRegion && (
          // Marcador para a posição atual no mapa
          <Marker
            coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
          />
        )}
      </MapView>

      {/* Botões de zoom no mapa */}
      <View style={styles.zoomButtons}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Text style={styles.buttonText}>Ampliar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Text style={styles.buttonText}>Reduzir</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para alternar entre os tipos de mapa */}
      <TouchableOpacity style={styles.toggleMapButton} onPress={handleToggleMapType}>
        <Text style={styles.buttonText}>{mapType === 'standard' ? 'Satélite' : 'Normal'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
  zoomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  zoomButton: {
    backgroundColor: '#B71C1C',
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  toggleMapButton: {
    backgroundColor: '#B71C1C',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default InserirLocalizacao;
