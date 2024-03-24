import * as Location from 'expo-location';

const getLocationCoordinates = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return null;
  }

  let location = await Location.getCurrentPositionAsync({});
  let { latitude, longitude } = location.coords;
  let region = {latitude, longitude, latitudeDelta: 0.15, longitudeDelta: 0.15 }
  return region;
};

export default getLocationCoordinates;
