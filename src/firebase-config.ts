// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { IUser } from "./interface";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const userCollectionRef = collection(db, "usersRedux");

export const getAllUser = async () => {
  try {
    const data = await getDocs(userCollectionRef);
    const users: IUser[] = data.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name || "",
      username: doc.data().username || "",
      age: doc.data().age || 0,
    }));
    return users;
  } catch (error) {
    console.log("Error to get users: " + error);
    throw error;
  }
};

export const addUserFirebase = async (user: IUser) => {
  try {
    await addDoc(userCollectionRef, user);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserFirebase = async (id: string) => {
  try {
    const userDoc = doc(db, "usersRedux", id);
    await deleteDoc(userDoc);
  } catch (err) {
    console.log(err);
  }
};

export const changeUserUsernameFirebase = async (id: string, newUsername: string) => {
  try {
    
    const userDoc = doc(db, "usersRedux", id);
    await updateDoc(userDoc, {username: newUsername});
    console.log(`Username updated successfully for user with ID: ${id}`);
  } catch (error) {
    console.log(error);
  }
}
