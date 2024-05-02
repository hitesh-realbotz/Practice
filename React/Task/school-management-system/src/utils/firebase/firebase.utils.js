import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  where
} from 'firebase/firestore';
import { CONSTANTS } from "../../constants/constants";

const firebaseConfig = {
  apiKey: "AIzaSyDnsJOrRraDRxWozW2JtW9yERTLQVK0VLo",
  authDomain: "school-ms-react-19a4d.firebaseapp.com",
  projectId: "school-ms-react-19a4d",
  storageBucket: "school-ms-react-19a4d.appspot.com",
  messagingSenderId: "425543870708",
  appId: "1:425543870708:web:37e50430519d19a29ad6a1"
};

const app = initializeApp(firebaseConfig);



export const auth = getAuth();

export const db = getFirestore();

//Create User Account
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

//Adds Data to Server - User
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userSnapshot;
};


//Sign-in with email & password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//Sign-out
export const signOutUser = async () => await signOut(auth);

//Gets current logged-in user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};


//Adds Data to Server - Students, Projects
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  console.log('FireBaseADD', collectionKey, objectsToAdd);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, (collectionKey === CONSTANTS.STUDENT_REMOTE_FOLDER) ? `${CONSTANTS.STANDARD_REMOTE_FOLDER}-${object.standard}` : collectionKey);
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//Updates Data to Server - Students, Projects
export const updateCollectionAndDocuments = async (
  collectionKey,
  objectsToUpdate,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  // Delete existing documents before adding new ones
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  if (objectsToUpdate.length) {
    console.log('In Length FireBaseUP');
    objectsToUpdate.forEach((object) => {
      const docRef = doc(collectionRef, (collectionKey === CONSTANTS.STUDENT_REMOTE_FOLDER) ? `${CONSTANTS.STANDARD_REMOTE_FOLDER}-${object.standard}` : collectionKey);
      batch.set(docRef, object);
    });
  }

  await batch.commit();
  console.log('done');
};

//Gets Students
export const getStudentsAndDocuments = async () => {
  const collectionRef = collection(db, 'students');
  const q = query(collectionRef);
  // const q = query(collectionRef, where("standard", "==", 2));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

//Gets Projects
export const getProjectsAndDocuments = async () => {
  const collectionRef = collection(db, CONSTANTS.PROJECT_REMOTE_FOLDER);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

