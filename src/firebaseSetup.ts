import { initializeApp } from 'firebase/app'; 
import { getAuth } from 'firebase/auth'; 
import { getDatabase } from 'firebase/database';  
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC91fqBnAC_T7PWiHlDSZnRJ-PanXfUQuE",
    authDomain: "hothweels-archiver.firebaseapp.com",
    databaseURL: "https://hothweels-archiver-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hothweels-archiver",
    storageBucket: "hothweels-archiver.appspot.com",
    messagingSenderId: "266964266314",  
    appId: "1:266964266314:web:499d51d0d077d4b3e725b3"
};

const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app); 
export const db = getDatabase(app); 
export const firestore = getFirestore(app); 
export const dbUrl = firebaseConfig.databaseURL; 