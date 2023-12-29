import {getApp, getApps, initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCyoiHQyeMfOG2FKRRbwGVp42HQ4ubDi0g",
    authDomain: "hms-dropbox.firebaseapp.com",
    projectId: "hms-dropbox",
    storageBucket: "hms-dropbox.appspot.com",
    messagingSenderId: "655618642425",
    appId: "1:655618642425:web:4ea4c0da7500062d962d28"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const storage = getStorage();

export {app, db, storage};