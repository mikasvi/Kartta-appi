import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Alert, Modal, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { addLocationToFirestore } from '../firebase/Config';

const MapScreen = ({ route, navigation }) => {
  const location = route.params?.location;
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const saveLocation = async () => {
    if (location) {
      const data = {
        latitude: location.latitude,
        longitude: location.longitude,
        description: description,
        timestamp: new Date()
      };
      await addLocationToFirestore(data);
      setModalVisible(false);
      setDescription('');
      Alert.alert('Sijainti tallennettu', 'Sijaintisi on tallennettu onnistuneesti.');
    } else {
      Alert.alert('Ei sijaintitietoja', 'Sijaintitietoja ei ole saatavilla.');
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={location}
            title="My Location"
          />
        </MapView>
      ) : null}
      <Button title="Tallenna sijaintini" onPress={() => setModalVisible(true)} />
      <Button title="Palaa takaisin" onPress={() => navigation.goBack()} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Anna kuvaus:</Text>
            <TextInput
              style={styles.input}
              placeholder="Kirjoita kuvaus"
              value={description}
              onChangeText={setDescription}
            />
            <Button title="Tallenna" onPress={saveLocation} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default MapScreen;
