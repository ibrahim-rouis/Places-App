import { useEffect } from 'react';
import { db } from './services/firebase-services';
import { addDoc, collection } from 'firebase/firestore';

function App() {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        const docRef = await addDoc(collection(db, 'test'), {
          message: 'firestore working',
        });
        console.log(
          `Successfully added document ${docRef.id} to Firestore "test" collection.`,
        );
      } catch (error) {
        console.error(error);
      }
    };

    testFirestore();
  }, []);

  return <></>;
}

export default App;
