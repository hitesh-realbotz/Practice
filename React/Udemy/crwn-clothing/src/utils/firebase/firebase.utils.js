import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth';
  import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3GV59cBUW9WXaIoIVhktylzI1h_AXqZ8",
    authDomain: "crwn-clothing-db-ceabe.firebaseapp.com",
    projectId: "crwn-clothing-db-ceabe",
    storageBucket: "crwn-clothing-db-ceabe.appspot.com",
    messagingSenderId: "925971308027",
    appId: "1:925971308027:web:c7a05d1b529d577ccd7f5e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
  }

