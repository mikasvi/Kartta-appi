import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from 'firebase/firestore';
import { deleteDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {

};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const addLocationToFirestore = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "locations"), {
      latitude: data.latitude,
      longitude: data.longitude,
      description: data.description,
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const deleteLocationFromFirestore = async (id) => {
  try {
    await deleteDoc(doc(firestore, "locations", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export { firestore, addLocationToFirestore, deleteLocationFromFirestore };