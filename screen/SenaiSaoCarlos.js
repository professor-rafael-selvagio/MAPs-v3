import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';


export default function SenaiSaoCarlos() {
  const mapRef = useRef(null);
  const [routeDetails, setRouteDetails] = useState(null); // V3
  const apiKey = 'AIzaSyCI8FdOqyqC7FdZ3E3lHvxRYF88Q1kat8c'; // V3

  useEffect(() => {
    // Coordenadas do Senai São Carlos
    const latitude = -22.02301;
    const longitude = -47.89740;
    

    // Define a região do mapa ao montar o componente
    mapRef.current.setCamera({ center: { latitude, longitude }, zoom: 18 });


    // INICIO V3
    const calcularDistancia = async () => {
      // Coordenadas do Senai São Carlos
      const origin = { latitude: -22.02301, longitude: -47.89740 };

      // Coordenadas do Shopping Iguatemi
      const destination = { latitude: -22.01746, longitude: -47.91490 };

      // Faz a requisição para a API de direções do Google Maps
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`
      );

      // Obtém os detalhes da rota a partir da resposta da API
      const route = response.data.routes[0];
      setRouteDetails(route);
    }

    calcularDistancia();
    // FIM V3
  }, []);

  return (
    // Componente de contêiner que envolve o mapa
    <View style={styles.container}>

      {/* MapView é o componente de mapa fornecido pelo pacote react-native-maps */}
      <MapView

        // Ref é usada para acessar métodos do componente MapView programaticamente
        ref={mapRef}

        // Estilo do mapa, definido pelos estilos do componente StyleSheet
        style={styles.map}

        // Mostra a localização do usuário no mapa
        showsUserLocation={true}
        
        // Região inicial ao abrir o mapa
        initialRegion={{
          latitude: -22.02301,
          longitude: -47.89740,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* Marcação no mapa - Marker representa um ponto específico no mapa */}
        <Marker
          // Coordenadas da marcação (Senai São Carlos)
          coordinate={{ latitude: -22.02301, longitude: -47.89740 }}
          // Título exibido quando a marcação é tocada
          title="Senai São Carlos"
        >
          <Image
            source={require('../src/img/BandeiraSenai.png')}
            style={styles.markerImage}
          />
        </Marker>

        {/* V3 - segunda marcação no mapa */}
        <Marker
          // Coordenadas da marcação (Shopping Iguatemi)
          coordinate={{ latitude: -22.01746, longitude: -47.91490 }}
          // Título exibido quando a marcação é tocada
          title="Shopping Iguatemi"
        />

        {/* V3 - marcação de direção */}
        <MapViewDirections
          origin={{ latitude: -22.02301, longitude: -47.89740 }}
          destination={{ latitude: -22.01746, longitude: -47.91490 }}
          apikey={apiKey}
          strokeWidth={3}
          strokeColor="blue"
        />
      </MapView>

      {/* V3 - Exibir detalhes da rota, como distância */}
      {routeDetails && (
        <View style={{ padding: 16, backgroundColor: 'white' }}>
          <Text>Distância: {routeDetails.legs[0].distance.text}</Text>
          <Text>Duração: {routeDetails.legs[0].duration.text}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 40,
    height: 40,
  }
});
