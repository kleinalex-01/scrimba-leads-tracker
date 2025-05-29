import { initializeApp } from "firebase/app";
import { getDatabase, ref} from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: "https://leads-tracker-3225d-default-rtdb.europe-west1.firebasedatabase.app/"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const refDatabase = ref(database, "tasks");


export {firebaseApp, database, refDatabase}