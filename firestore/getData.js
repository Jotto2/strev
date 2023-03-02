import firebase_app from "lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

function getCollection(collectionName) {
  return new Promise((resolve, reject) => {
    try {
      const collectionRef = collection(db, collectionName);
      getDocs(collectionRef).then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return { id: doc.id, ...docData };
        });
        resolve({ result: data, error: null });
      }).catch((error) => {
        reject({ result: null, error });
      });
    } catch (error) {
      reject({ result: null, error });
    }
  });
}

export default getCollection;
