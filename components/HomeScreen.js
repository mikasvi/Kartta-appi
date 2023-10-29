import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { firestore, deleteLocationFromFirestore } from '../firebase/Config';
import { collection, onSnapshot } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const locationsCollection = collection(firestore, 'locations');
    const unsubscribe = onSnapshot(locationsCollection, snapshot => {
      const newLocations = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        newLocations.push({ ...data, id: doc.id, timestamp: data.timestamp?.toDate().toString() });
      });
      setLocations(newLocations);
      setLoading(false);
    }, err => {
      console.error('Error fetching locations:', err);
      Alert.alert('Virhe', 'Sijaintien hakeminen epäonnistui');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getLocationAndNavigate = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    navigation.navigate('Map', { location: location.coords });
  };

  const deleteLocation = async (id) => {
    Alert.alert(
      "Poista sijainti",
      "Oletko varma, että haluat poistaa tämän sijainnin?",
      [
        { text: "Peruuta", style: "cancel" },
        { text: "Poista", onPress: () => deleteLocationFromFirestore(id) }
      ]
    );
  };

  const openLocation = (location) => {
    navigation.navigate('LocationMap', { location });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openLocation(item)}>
      <View style={styles.locationContainer}>
        <Text>Kuvaus: {item.description}</Text>
        <Text>Lat: {item.latitude}</Text>
        <Text>Lon: {item.longitude}</Text>
        <Text>Aika: {item.timestamp}</Text>
        <TouchableOpacity onPress={(e) => {e.stopPropagation(); deleteLocation(item.id);}} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Poista</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Tallennetut Sijainnit</Text>
      {loading ? (
        <Text>Ladataan...</Text>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
      <Button title="Hae sijaintini ja näytä kartta" onPress={getLocationAndNavigate} />
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  locationContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
